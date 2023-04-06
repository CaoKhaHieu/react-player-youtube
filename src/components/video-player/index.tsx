import React, { createContext, forwardRef, useContext, useEffect, useRef } from 'react';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import './style.scss';
import '../../stylesheets/style.scss';
import { VideoOptions } from '../../types';
import { SettingButton } from '../controls-btn/index.js';
import { applyFontIcons, getDataLocal } from '../../utils';
import Settings from '../settings';
import { Helmet } from "react-helmet";
import useToggle from '../../hooks/useToggle';
import { DATA_LOCAL, ERRORS, INIT_PLAYER_CONFIG } from '../../constants';

const VideoContext = createContext<any>(null);

export const useVideoPlayer = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw Error(ERRORS.NO_CONTEXT);
  }

  return context;
};

videojs.registerComponent('SettingButton', SettingButton);

const VideoPlayer = forwardRef((props: VideoOptions, playerRef: any) => {
  const { options, initSuccess, } = props;
  const videoRef = useRef<any>();
  const { toggle, handleToggle } = useToggle();

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
        playerRef.current.playbackRate(configPlayerDefault ? configPlayerDefault[DATA_LOCAL.SPEED_CONTROL].value : INIT_PLAYER_CONFIG.SPEED_CONTROL);
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

  const valueContext = {
    playerRef,
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
              toggle && <Settings handleToggle={handleToggle} />
            }
          </div>
        </div>
      </div>
    </VideoContext.Provider>
  );
});

export default VideoPlayer;
