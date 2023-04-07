import React, { useEffect, useState } from 'react';
import './style.scss';
import { menuSettings } from '..';
import Option, { OptionData } from '../../option';
import Icon from '../../icon';
import { useVideoPlayer } from '../../video-player';
import { getDataLocal, saveDataLocal } from '../../../utils';
import { PLAYER_CONFIG, SUBTITLE_ACTIONS, SUBTITLE_OFF } from '../../../constants';
import { MenuSettingItem } from '../../../types';
import useSettings from '../../../hooks/useSettings';


interface SettingDetailOptions {
  type: string;
  goBack: () => void;
  handleConfigSetting: (data: any) => void;
}

interface HandleClickOptions {
  [key: number]: {
    defaultValue: any;
    listOptions: any[];
    onClick: (item: OptionData) => void
  };
}

const icon = <Icon className='material-symbols-outlined' content={'check_small'} />

const SettingDetail = (props: SettingDetailOptions) => {
  const { type, goBack, handleConfigSetting } = props;
  const dataLocal = getDataLocal();
  const { subtitles } = useVideoPlayer();
  const { handleSpeedVideo, handleSubtitle }: any = useSettings();
  
  const settingData: MenuSettingItem = menuSettings[type];
  const settingDetailData: HandleClickOptions = {
    [PLAYER_CONFIG.SPEED_CONTROL]: {
      listOptions: [...settingData.options],
      defaultValue: dataLocal && dataLocal[type]?.value || 1,
      onClick: (item: OptionData) => {
        return () => {
          const keyLocal = PLAYER_CONFIG.SPEED_CONTROL.toString();
          handleConfigSetting({
            [PLAYER_CONFIG.SPEED_CONTROL]: item.label,
          });
          handleSpeedVideo(item.value);
          setCurrentValue(item.value || 1);
          saveDataLocal(keyLocal, item);
          goBack();
        };
      },
    },
    [PLAYER_CONFIG.SUBTITLES]: {
      listOptions: subtitles,
      defaultValue: SUBTITLE_OFF,
      onClick: (item: OptionData) => {
        return () => {
          handleConfigSetting({
            [PLAYER_CONFIG.SUBTITLES]: item.label,
          });
          setCurrentValue(item.value);
          handleSubtitle(SUBTITLE_ACTIONS.SWITCH, item);
          goBack();
        }
      }
    },
  };
  const listOptions = settingDetailData[type as any].listOptions.map((item: OptionData) => ({...item, icon}));

  const [currentValue, setCurrentValue] = useState<string>(settingDetailData[type as any].defaultValue);

  useEffect(() => {
    if (type === PLAYER_CONFIG.SUBTITLES) {
      handleSubtitle(SUBTITLE_ACTIONS.GET_CURRENT_SUB, null, (track: TextTrack) => setCurrentValue(track.language))
    }
  }, []);

  return (
    <div className='setting-detail'>
      <div className='setting-detail-header'>
        <div className='header-left'>
          <Icon
            className='material-symbols-outlined pointer'
            content='keyboard_arrow_left'
            onClick={goBack}
          />
          <p className='header-title'>{settingData.label}</p>
        </div>
      </div>
      {
        listOptions && listOptions.map((item: OptionData, index: number) =>
          <Option
            key={index}
            option={item}
            onClick={settingDetailData[type as any].onClick(item) as any}
            active={currentValue === item.value}
          />
        )
      }
    </div>
  );
};

export default SettingDetail;
