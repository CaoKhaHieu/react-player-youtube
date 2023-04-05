import React, { forwardRef, useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.scss';
import { VideoOptions } from '../../types';
import { SettingButton } from '../controls-btn/index.js';
import { applyFontIcons } from '../../utils';
import Settings from '../settings';
import { Helmet } from "react-helmet";
import useToggle from '../../hooks/useToggle';

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
    if (!playerRef.current) {
      const newPlayer = videojs(videoRef.current, options, () => {
        playerRef.current = newPlayer;
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
      }, 16);
    }
  };

  return (
    <div className='player'>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&family=Rubik+Vinyl&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="video-js-custom">
        <div data-vjs-player>
          <video ref={videoRef} className="video-js">
          </video>
          {
            toggle && <Settings />
          }
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;
