import React, { useState } from 'react';
import './style.scss';
import { menuSettings } from '..';
import Option, { OptionData } from '../../option';
import Icon from '../../icon';
import { useVideoPlayer } from '../../video-player';
import { getDataLocal, saveDataLocal } from '../../../utils';
import { DATA_LOCAL, INIT_PLAYER_CONFIG } from '../../../constants';
import { MenuSettingItem } from '../../../types';

interface SettingDetailOptions {
  type: string;
  goBack: () => void;
}

const icon = <Icon className='material-symbols-outlined' content={'check_small'} />

const SettingDetail = (props: SettingDetailOptions) => {
  const { type = '', goBack } = props;
  const defaultValue = getDataLocal();
  const { playerRef } = useVideoPlayer();
  const settingData: MenuSettingItem = menuSettings[type];
  const listOptions = [...settingData.options].map((item: OptionData) => ({...item, icon}));
  const [currentValue, setCurrentValue] = useState<number>(defaultValue && defaultValue[type].value || INIT_PLAYER_CONFIG.SPEED_CONTROL);

  const handleSpeedVideo = (item: OptionData) => {
    return () => {
      setCurrentValue(item.value || 1);
      saveDataLocal(DATA_LOCAL.SPEED_CONTROL, item);
      playerRef.current.playbackRate(item.value);
      goBack();
    };
  };

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
            onClick={handleSpeedVideo(item)}
            active={currentValue === item.value}
          />
        )
      }
    </div>
  );
};

export default SettingDetail;
