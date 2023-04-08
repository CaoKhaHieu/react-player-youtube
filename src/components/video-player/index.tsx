import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import './style.scss';
import '../../stylesheets/style.scss';
import { SubtitleActions, SubtitleItem, VideoOptions } from '../../types';
import { SettingButton } from '../controls-btn/index.js';
import { getDataLocal } from '../../utils';
import Settings from '../settings';
import { Helmet } from "react-helmet";
import useToggle from '../../hooks/useToggle';
import { CAPTIONS, ERRORS, PLAYER_CONFIG, SUBTITLE_ACTIONS, SUBTITLE_MODE, SUBTITLE_OFF, dummySubtitle } from '../../constants';

const VideoContext = createContext<any>({
  playerRef: null,
  subtitles: [],
  handleChooseSubLanguage: () => {},
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
  const defaultSub = subtitles?.find((item: SubtitleItem) => item.isDefault) || dummySubtitle;
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
  const [inited, setInited] = useState<boolean>(false);
  const [subLanguage, setSubLanguage] = useState<SubtitleItem>(defaultSub);

  const { toggle, handleToggle } = useToggle();

  useEffect(() => {
    if (options) {
      initPlayer();
    }
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      watchSubtitleBtn();
    }
  }, [inited, subLanguage]);

  // INITPLAYER

  const initPlayer = () => {
    const videojsOptions = {
      ...options,
    };
    const configPlayerDefault = getDataLocal();
    if (!playerRef.current) {
      const newPlayer = videojs(videoRef.current, videojsOptions, () => {
        playerRef.current = newPlayer;
        playerRef.current.playbackRate(configPlayerDefault ? configPlayerDefault[PLAYER_CONFIG.SPEED_CONTROL].value : 1);
        initBtnControls();
        if (subtitles?.length) {
          addTextTracks();
          showDefaultSubtitle();
        }
        if (typeof initSuccess === 'function') {
          initSuccess();
        }
        setInited(true);
      });
    }
  };

  // CUSTOM BUTTON
  const initBtnControls = () => {
    const settingBtn = playerRef.current.controlBar.getChild('buttonName');
    if (!settingBtn) {
      playerRef.current.controlBar.addChild('SettingButton', {
        onClick: handleToggle
      }, 15);
    }
  };

  // SAVE DATA SETTINGS

  const handleConfigSetting = (data: any) => {
    setConfigSetting((prev: any) => ({...prev, ...data}));
  };

  // SPEED VIDEO

  const handleSpeedVideo = (data: { label: string, value: number}) => {
    handleConfigSetting({
      [PLAYER_CONFIG.SPEED_CONTROL]: {
        label: data.label,
        value: data.value,
      },
    });
    playerRef.current.playbackRate(data.value);
  };

  // SUBTITLES

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
    if (defaultSub) {
      handleSubtitle(SUBTITLE_ACTIONS.SWITCH as SubtitleActions, defaultSub, () => {});
    }
  };

  const handleChooseSubLanguage = (language: SubtitleItem) => {
    setSubLanguage(() => language);
  };

  const watchSubtitleBtn = () => {
    const subtitleButton = playerRef.current.controlBar.subsCapsButton;
    // Clear event click registered previous
    subtitleButton.off('click');
    subtitleButton.on('click', () => {
      const hasActive = subtitleButton.el().classList?.contains('active') || false;
      const actions = {
        type: hasActive ? SUBTITLE_ACTIONS.TURNOFF : SUBTITLE_ACTIONS.SWITCH,
        label: hasActive ? 'Off' : subLanguage.label,
        value: hasActive ? SUBTITLE_OFF : subLanguage.value
      }
      handleSubtitle(actions.type as SubtitleActions, subLanguage, () => {});
      toggleSubtitleBtn(actions.value);
      handleConfigSetting({
        [PLAYER_CONFIG.SUBTITLES]: {
          label: actions.label,
          value: actions.value,
        },
      })
    });
  };

  const handleSubtitle = (
    action: SubtitleActions,
    subtitle: SubtitleItem,
    callback: (track: TextTrack) => void,
  ) => {
    const tracksList = playerRef?.current?.textTracks();
    if (tracksList) {
      const actions = {
        [SUBTITLE_ACTIONS.SWITCH]: (track: TextTrack) => {
          const configSub = {
            [PLAYER_CONFIG.SUBTITLES]: {
              label: subtitle.label,
              value: subtitle.value,
            },
          };
          if (track.kind === CAPTIONS && track.language === subtitle.value) {
            subtitle.value !== SUBTITLE_OFF && handleChooseSubLanguage(subtitle);
            track.mode = SUBTITLE_MODE.SHOWING as TextTrackMode;
          } else {
            track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
          }
          toggleSubtitleBtn(subtitle.value);
          handleConfigSetting(configSub);
        },
        [SUBTITLE_ACTIONS.TURNOFF]: (track: TextTrack) => {
          track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
        },
        [SUBTITLE_ACTIONS.GET_CURRENT_SUB]: (track: TextTrack) => {
          if (track.kind === CAPTIONS && track.mode === SUBTITLE_MODE.SHOWING) {
            callback && callback(track);
          }
        }
      };
      for (let i = 0; i < tracksList.length; i++) {
        const track = tracksList[i];
        actions[action](track);
      }
    }
  };

  const toggleSubtitleBtn = (value: string) => {
    const subtitleButton = playerRef?.current?.controlBar?.subsCapsButton?.el();
    if (subtitleButton) {
      const hasActive = subtitleButton?.classList?.contains('active');
      if (subtitleButton && value === SUBTITLE_OFF) {
        hasActive && subtitleButton?.classList?.remove('active');
      } else {
        !hasActive && subtitleButton?.classList?.add('active');
      }
    }
  };

  const valueContext = {
    playerRef,
    // CONFIG SETTING
    configSetting,
    handleConfigSetting,
    // SPEED
    handleSpeedVideo,
    // SUBTITLE
    handleSubtitle,
    toggleSubtitleBtn,
    handleChooseSubLanguage,
    subtitles: [dummySubtitle, ...subtitles],
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
