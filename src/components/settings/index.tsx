import React, { useEffect, useRef } from 'react';
import './index.scss';
import Option from '../option';
import Icon from '../icon';

interface SettingOptions {
  handleToggle: () => void;
};

const menuSettings = {
  speed: {
    label: 'Playback speed',
    icon: <Icon className='material-symbols-outlined' content={'slow_motion_video'} />
  },
  subtitles: {
    label: 'Subtitles',
    icon: <Icon className='material-symbols-outlined' content={'closed_caption'} />
  },
  quality: {
    label: 'Quality',
    icon: <Icon className='material-symbols-outlined' content={'tune'} />
  },
};

const Settings = (props: SettingOptions) => {
  const { handleToggle } = props;
  const subRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className='settings' ref={subRef}>
      {
        Object.values(menuSettings).map((item, index: number) =>
          <Option key={index} option={item} />
        )
      }
    </div>
  );
};

export default Settings;
