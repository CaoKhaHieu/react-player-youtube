import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import Option from '../option';
import Icon from '../icon';
import SettingDetail from './setting-detail';
import { DATA_LOCAL, INIT_PLAYER_CONFIG } from '../../constants';
import { MenuSettingItem, MenuSettings } from '../../types';
import { getDataLocal } from '../../utils';
import { dummySubtitles } from '../video-player';

interface SettingOptions {
  handleToggle: () => void;
};

export const menuSettings: MenuSettings = {
  [DATA_LOCAL.SPEED_CONTROL]: {
    id: DATA_LOCAL.SPEED_CONTROL,
    label: 'Playback speed',
    icon: <Icon className='material-symbols-outlined' content={'slow_motion_video'} />,
    options: [
      {
        label: '0.25',
        value: 0.25,
      },
      {
        label: '0.5',
        value: 0.5,
      },
      {
        label: '0.75',
        value: 0.75,
      },
      {
        label: 'Normal',
        value: 1
      },
      {
        label: '1.25',
        value: 1.25,
      },
      {
        label: '1.5',
        value: 1.5,
      },
      {
        label: '1.75',
        value: 1.75,
      },
      {
        label: '2',
        value: 2,
      },
    ]
  },
  subtitles: {
    id: 'subtitles',
    label: 'Subtitles',
    icon: <Icon className='material-symbols-outlined' content={'closed_caption'} />,
    options: dummySubtitles,
  },
  quality: {
    id: 'Quality',
    label: 'Quality',
    icon: <Icon className='material-symbols-outlined' content={'tune'} />,
    options: [
      {
        label: '0.25',
        value: 0.25,
      },
    ]
  },
};

const Settings = (props: SettingOptions) => {
  const { handleToggle } = props;
  const subRef = useRef<HTMLDivElement>(null);
  const [settingDetail, setSettingDetail] = useState<string | null>();
  const settingsOptions: MenuSettingItem[] = Object.values(menuSettings);
  const configPlayer = {
    ...INIT_PLAYER_CONFIG,
    ...getDataLocal(),
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const targetElement = e?.target as HTMLDivElement;
      if (!subRef.current?.contains(targetElement) && targetElement?.className !== 'vjs-icon-placeholder') {
        handleToggle();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openSettingDetail = (item: MenuSettingItem) => {
    return () => {
      setSettingDetail(item.id);
    };
  };

  const goBack = () => {
    setSettingDetail(null);
  };

  return (
    <div className='settings' ref={subRef}>
      {
        !settingDetail && settingsOptions.map((item: MenuSettingItem) =>
          <Option
            key={item.id}
            option={item}
            alwaysShowIcon
            hasOptionList
            currentValue={configPlayer[item.id]?.label}
            onClick={openSettingDetail(item)}
          />
        )
      }

      {
        settingDetail &&
        <SettingDetail
          type={settingDetail}
          goBack={goBack}
        />
      }
    </div>
  );
};

export default Settings;
