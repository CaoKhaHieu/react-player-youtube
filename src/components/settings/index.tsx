import React, { forwardRef, useEffect, useRef, useState } from 'react';
import './style.scss';
import Option from '../option';
import { PLAYER_CONFIG, SUBTITLE_ACTIONS } from '../../constants';
import { MenuSettingItem, MenuSettings } from '../../types';
import { useVideoPlayer } from '../video-player';
import SettingHeader from './setting-header';
import { saveDataLocal } from '../../utils';

interface SettingOptions {
  handleToggle: () => void;
};

export const menuSettings: MenuSettings = {
  [PLAYER_CONFIG.SPEED_CONTROL]: {
    id: PLAYER_CONFIG.SPEED_CONTROL,
    label: 'Playback speed',
    icon: 'slow_motion_video',
    options: [
      { label: '0.25', value: 0.25 },
      { label: '0.5', value: 0.5, },
      { label: '0.75', value: 0.75 },
      { label: 'Normal', value: 1 },
      { label: '1.25', value: 1.25 },
      { label: '1.5', value: 1.5 },
      { label: '1.75', value: 1.75 },
      { label: '2', value: 2 },
    ],
  },
  [PLAYER_CONFIG.SUBTITLES]: {
    id: PLAYER_CONFIG.SUBTITLES,
    label: 'Subtitles',
    icon: 'closed_caption',
    options: [],
    child: {
      [PLAYER_CONFIG.BACKGROUND]: {
        id: PLAYER_CONFIG.BACKGROUND,
        label: 'Background Color',
        options: [
          { label: 'White', value: '#FFF' },
          { label: 'Green', value: '#0F0' },
          { label: 'Black', value: '#000' },
          { label: 'Red', value: '#F00' },
          { label: 'Yellow', value: '#FF0' },
          { label: 'Blue', value: '#00F' },
        ]
      },
      [PLAYER_CONFIG.COLOR]: {
        id: PLAYER_CONFIG.COLOR,
        label: 'Color',
        options: [
          { label: 'White', value: '#FFF' },
          { label: 'Black', value: '#000' },
          { label: 'Green', value: '#0F0' },
          { label: 'Red', value: '#F00' },
          { label: 'Yellow', value: '#FF0' },
          { label: 'Blue', value: '#00F' },
        ]
      },
      [PLAYER_CONFIG.BACKGROUND_OPACITY]: {
        id: PLAYER_CONFIG.BACKGROUND_OPACITY,
        label: 'Background Opacity',
        options: [
          { label: '50%', value: '0.5' },
          { label: '100%', value: '1' },
        ]
      },
      [PLAYER_CONFIG.FONT_PERCENT]: {
        id: PLAYER_CONFIG.FONT_PERCENT,
        label: 'Font size',
        options: [
          { label: '50%', value: 0.5 },
          { label: '75%', value: 0.75 },
          { label: '100%', value: 1 },
          { label: '200%', value: 2 }
        ]
      },
      [PLAYER_CONFIG.TEXT_OPACITY]: {
        id: PLAYER_CONFIG.TEXT_OPACITY,
        label: 'Text opacity',
        options: [
          { label: '50%', value: '0.5' },
          { label: '100%', value: '1' },
        ]
      },
      [PLAYER_CONFIG.FONT_FAMILY]: {
        id: PLAYER_CONFIG.FONT_FAMILY,
        label: 'Font family',
        options: [
          { value: 'proportionalSansSerif', label: 'Proportional Sans-Serif' },
          { value: 'monospaceSansSerif', label: 'Monospace Sans-Serif' },
          { value: 'proportionalSerif', label: 'Proportional Serif' },
          { value: 'monospaceSerif', label: 'Monospace Serif' },
          { value: 'casual', label: 'Casual' },
          { value: 'script', label: 'Script' },
          { value: 'small-caps', label: 'Small Caps' }
        ]
      },
      [PLAYER_CONFIG.EDGE_STYLE]: {
        id: PLAYER_CONFIG.EDGE_STYLE,
        label: 'Character egde style',
        options: [
          { value: 'none', label: 'None' },
          { value: 'raised', label: 'Raised' },
          { value: 'depressed', label: 'Depressed' },
          { value: 'uniform', label: 'Uniform' },
          { value: 'dropshadow', label: 'Dropshadow' },
        ]
      },
      [PLAYER_CONFIG.WINDOW_COLOR]: {
        id: PLAYER_CONFIG.WINDOW_COLOR,
        label: 'Window color',
        options: [
          { label: 'White', value: '#FFF' },
          { label: 'Black', value: '#000' },
          { label: 'Green', value: '#0F0' },
          { label: 'Red', value: '#F00' },
          { label: 'Yellow', value: '#FF0' },
          { label: 'Blue', value: '#00F' },
        ]
      },
      [PLAYER_CONFIG.WINDOW_OPACITY]: {
        id: PLAYER_CONFIG.WINDOW_OPACITY,
        label: 'Window opacity',
        options: [
          { label: '50%', value: '0.5' },
          { label: '100%', value: '1' },
        ]
      },
    },
    isRadio: true,
  },
  [PLAYER_CONFIG.QUALITY]: {
    id: PLAYER_CONFIG.QUALITY,
    label: 'Quality',
    icon: 'tune',
    options: [],
  },
};

export const getSettingData = (keys: string[]) => {
  let settingData: any = menuSettings;
  for (let i = 0; i < keys.length; i++) {
    settingData = settingData[keys[i]];
  }
  return settingData;
};

const Settings = forwardRef((props: SettingOptions, ref) => {
  const { handleToggle } = props;
  const subRef = useRef<HTMLDivElement>(null);
  const { subtitles, qualities, configSetting, handleSpeedVideo, handleSubtitle, updateStyleSubtitle, handleChangeQualityVideo } = useVideoPlayer();

  const defaultList = Object.values(menuSettings);
  const [keys, setKeys] = useState<string[]>([]);
  const [settingData, setSettingData] = useState<MenuSettingItem>();
  const [options, setOptions] = useState<any[]>(defaultList);

  const lastKey = keys[keys.length - 1];
  const handleClickData = {
    [PLAYER_CONFIG.SPEED_CONTROL]: (item: any) => {
      const keyLocal = PLAYER_CONFIG.SPEED_CONTROL.toString();
      handleSpeedVideo(item);
      saveDataLocal(keyLocal, item);
    },
    [PLAYER_CONFIG.SUBTITLES]: (item: any) => {
      handleSubtitle(SUBTITLE_ACTIONS.SWITCH, item);
    },
    [PLAYER_CONFIG.BACKGROUND]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.COLOR]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.TEXT_OPACITY]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.FONT_PERCENT]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.BACKGROUND_OPACITY]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.FONT_FAMILY]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.WINDOW_COLOR]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.WINDOW_OPACITY]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.EDGE_STYLE]: (item: { label: string, value: string | number }) => {
      updateStyleSubtitle(item, lastKey);
    },
    [PLAYER_CONFIG.QUALITY]: (item: { label: string, value: string | number }) => {
      console.log({item})
      handleChangeQualityVideo(item)
    },
  };
  const isRadio = !!keys.length && keys[keys.length - 1] !== 'child' || false;

  console.log({settingData})
  useEffect(() => {
    // trigger click outside setting component
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

  useEffect(() => {
    const settingData = getSettingData(keys);
    setSettingData(settingData);
    if (settingData.id === PLAYER_CONFIG.SUBTITLES) {
      setOptions(subtitles);
      return;
    }

    if (settingData.id === PLAYER_CONFIG.QUALITY) {
      setOptions(qualities);
      return;
    }
    if (keys[keys.length - 1] === 'child') {
      setOptions(Object.values(settingData));
    } else {
      setOptions(settingData.options || defaultList);
    }
  }, [keys]);

  const handleClick = (item: any) => {
    const id = item?.id || '';
    if (isRadio) {
      handleClickData[keys[keys.length - 1]](item);
      removeLastKey();
    } else {
      pushNewKey(id);
    }
  };

  const showChild = () => {
    pushNewKey('child');
  };

  const pushNewKey = (newKey: string) => {
    if (keys.includes(newKey)) {
      return;
    }
    setKeys((prev: string[]) => [...prev, newKey]);
  };

  const removeLastKey = () => {
    const newKeys = [...keys].slice(0, -1);
    setKeys(() => newKeys);
  };

  return (
    <div className='settings' ref={subRef}>
      {
        keys.length ? 
        <SettingHeader
          title={settingData?.label || 'Subtitles'}
          hasChild={settingData?.child ? true : false}
          goBack={removeLastKey}
          optionsClick={showChild}
        /> : null
      }
      {
        options.length && options.map((item: any, index: number) =>
          <Option
            key={index}
            isRadio={isRadio}
            active={isRadio ? configSetting[settingData?.id || '']?.value === item.value : false}
            icon={item.icon}
            label={item.label}
            labelCurrentValue={configSetting[item?.id || settingData?.id]?.label}
            onClick={() => handleClick(item)}
          />
        )
      }
    </div>
  );
});

export default Settings;
