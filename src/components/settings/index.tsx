import React from 'react';
import './index.scss';
import Option from '../option';

const menuSettings = {
  speed: {
    label: 'Playback speed',
  },
  subtitles: {
    label: 'Subtitles',
  },
  quality: {
    label: 'Quality',
  },
};

const Settings = () => {
  return (
    <div className='settings'>
      {
        Object.values(menuSettings).map((item, index: number) =>
          <Option key={index} option={item} />
        )
      }
    </div>
  );
};

export default Settings;
