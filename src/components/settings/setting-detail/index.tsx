import React, { useState } from 'react';
import './style.scss';
import { menuSettings } from '..';
import Option, { OptionData } from '../../option';
import Icon from '../../icon';
import { useVideoPlayer } from '../../video-player';
import { getDataLocal, saveDataLocal } from '../../../utils';
import { PLAYER_CONFIG } from '../../../constants';
import { MenuSettingItem } from '../../../types';

interface SettingDetailOptions {
  type: number;
  goBack: () => void;
}

interface HandleClickOptions {
  [key: number]: {
    onClick: (item: OptionData) => () => void
  };
}

const icon = <Icon className='material-symbols-outlined' content={'check_small'} />

const SettingDetail = (props: SettingDetailOptions) => {
  const { type = 0, goBack } = props;
  const defaultValue = getDataLocal();
  const { playerRef } = useVideoPlayer();
  const settingData: MenuSettingItem = menuSettings[type];
  const listOptions = [...settingData.options].map((item: OptionData) => ({...item, icon}));
  const [currentValue, setCurrentValue] = useState<number>(defaultValue && defaultValue[type].value || PLAYER_CONFIG.SPEED_CONTROL);

  const handleSpeedVideo = (item: OptionData) => {
    return () => {
      const keyLocal = PLAYER_CONFIG.SPEED_CONTROL.toString();
      setCurrentValue(item.value || 1);
      saveDataLocal(keyLocal, item);
      playerRef.current.playbackRate(item.value);
      goBack();
    };
  };

  const handleSubtitle = (item: OptionData) => {
    return () => {
      console.log(item)
    };
  };

  const handleClick: HandleClickOptions = {
    [PLAYER_CONFIG.SPEED_CONTROL]: {
      onClick: handleSpeedVideo
    },
    [PLAYER_CONFIG.SUBTITLES]: {
      onClick: handleSubtitle
    },
  };

  console.log(handleClick[type], 0)

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
            onClick={handleClick[type].onClick(item)}
            active={currentValue === item.value}
          />
        )
      }
    </div>
  );
};

export default SettingDetail;
