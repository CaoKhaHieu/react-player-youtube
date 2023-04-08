import React from 'react';
import './style.scss';
import { menuSettings } from '..';
import Option, { OptionData } from '../../option';
import Icon from '../../icon';
import { useVideoPlayer } from '../../video-player';
import { saveDataLocal } from '../../../utils';
import { PLAYER_CONFIG, SUBTITLE_ACTIONS } from '../../../constants';
import { MenuSettingItem } from '../../../types';


interface SettingDetailOptions {
  type: string;
  goBack: () => void;
}

interface HandleClickOptions {
  [key: number]: {
    listOptions: any[];
    onClick: (item: OptionData) => void
  };
}

const icon = <Icon className='material-symbols-outlined' content={'check_small'} />

const SettingDetail = (props: SettingDetailOptions) => {
  const { type, goBack } = props;
  const { subtitles, configSetting, handleSpeedVideo, handleSubtitle } = useVideoPlayer();
  
  const settingData: MenuSettingItem = menuSettings[type];
  const settingDetailData: HandleClickOptions = {
    [PLAYER_CONFIG.SPEED_CONTROL]: {
      listOptions: [...settingData.options],
      onClick: (item: OptionData) => {
        return () => {
          const keyLocal = PLAYER_CONFIG.SPEED_CONTROL.toString();
          handleSpeedVideo(item);
          saveDataLocal(keyLocal, item);
          goBack();
        };
      },
    },
    [PLAYER_CONFIG.SUBTITLES]: {
      listOptions: subtitles,
      onClick: (item: OptionData) => {
        return () => {
          handleSubtitle(SUBTITLE_ACTIONS.SWITCH, item);
          goBack();
        }
      }
    },
  };
  const listOptions = settingDetailData[type as any].listOptions.map((item: OptionData) => ({...item, icon}));

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
            active={configSetting[type as any].value === item.value}
          />
        )
      }
    </div>
  );
};

export default SettingDetail;
