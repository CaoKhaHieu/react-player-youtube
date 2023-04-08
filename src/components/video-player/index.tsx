import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import './style.scss';
import '../../stylesheets/style.scss';
import { SubtitleActions, SubtitleItem, VideoOptions } from '../../types';
import { SettingButton } from '../controls-btn/index.js';
import { applyFontIcons, getDataLocal } from '../../utils';
import Settings from '../settings';
import { Helmet } from "react-helmet";
import useToggle from '../../hooks/useToggle';
import { ERRORS, PLAYER_CONFIG, SUBTITLE_ACTIONS, dummySubtitles } from '../../constants';
import useSettings from '../../hooks/useSettings';

const VideoContext = createContext<any>({
  playerRef: null,
  subtitles: [],
  handleChooseSublanguage: () => {},
  handleConfigSetting: () => {},
});

export const useVideoPlayer = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw Error(ERRORS.NO_CONTEXT);
  }

  return context;
};

videojs.registerComponent('SettingButton', SettingButton);

const VideoPlayer = forwardRef((props: VideoOptions, playerRef: any) => {
  const { options, subtitles = [], initSuccess, } = props;
  const defaultSub = subtitles?.find((item: SubtitleItem) => item.isDefault);
  const dataLocal = getDataLocal();

  const videoRef = useRef<any>();
  const settingRef = useRef<any>();

  const [configSetting, setConfigSetting] = useState({
    [PLAYER_CONFIG.SUBTITLES]: {
      label: 'Off',
      value: 'off',
    },
    [PLAYER_CONFIG.SPEED_CONTROL]: {
      label: dataLocal ? dataLocal[PLAYER_CONFIG.SPEED_CONTROL]?.label : 'Normal',
      value: dataLocal ? dataLocal[PLAYER_CONFIG.SPEED_CONTROL]?.value : 1,
    },
  });
  const [subLanguage, setSubLanguage] = useState<SubtitleItem | null>(defaultSub || null);
  console.log('video', configSetting, subLanguage)

  const { toggle, handleToggle } = useToggle();
  const { handleSubtitle, toggleSubtitleBtn } = useSettings();

  useEffect(() => {
    if (options) {
      initPlayer();
      applyFontIcons();
    }
  }, []);

  const initPlayer = () => {
    const videojsOptions = {
      ...options,
    };
    const configPlayerDefault = getDataLocal();
    if (!playerRef.current) {
      const newPlayer = videojs(videoRef.current, videojsOptions, () => {
        playerRef.current = newPlayer;
        playerRef.current.playbackRate(configPlayerDefault ? configPlayerDefault[PLAYER_CONFIG.SPEED_CONTROL].value : 1);
        if (subtitles?.length) {
          addTextTracks();
          showDefaultSubtitle();
        }
        initBtnControls();
        if (typeof initSuccess === 'function') {
          initSuccess();
        }
      });
    }
  };

  const initBtnControls = () => {
    const settingBtn = playerRef.current.controlBar.getChild('buttonName');
    if (!settingBtn) {
      playerRef.current.controlBar.addChild('SettingButton', {
        onClick: handleToggle
      }, 15);
    }
  };

  const addTextTracks = () => {
    subtitles?.length && subtitles.forEach((item: SubtitleItem) => {
      playerRef.current.addRemoteTextTrack({
        src: item.url,
        kind: 'captions',
        srclang: item.value,
        label: item.label,
      }, false);
    });
  };

  const showDefaultSubtitle = () => {
    const tracks = playerRef?.current?.textTracks();
    if (defaultSub) {
      handleSubtitle(SUBTITLE_ACTIONS.SWITCH as SubtitleActions, defaultSub, () => {}, tracks);
      toggleSubtitleBtn(playerRef, defaultSub.value);
      handleConfigSetting({
        [PLAYER_CONFIG.SUBTITLES]: defaultSub,
      });
    }
  };

  const handleConfigSetting = (data: any) => {
    setConfigSetting((prev: any) => ({...prev, ...data}));
  };

  const handleChooseSublanguage = (language: SubtitleItem) => {
    setSubLanguage(language);
  };

  const valueContext = {
    playerRef,
    configSetting,
    handleConfigSetting,
    handleChooseSublanguage,
    subtitles: [...dummySubtitles, ...subtitles],
  };

  return (
    <VideoContext.Provider value={valueContext}>
      <div className='player'>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&family=Rubik+Vinyl&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        </Helmet>
        <div className="video-js-custom">
          <div data-vjs-player>
            <video ref={videoRef} className="video-js">
            </video>
            {
              toggle && <Settings ref={settingRef} handleToggle={handleToggle} />
            }
          </div>
        </div>
      </div>
    </VideoContext.Provider>
  );
});

export default VideoPlayer;
