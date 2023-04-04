import React, { forwardRef, memo, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.scss';
import { VideoOptions } from '../../types';
import { SettingButton } from '../controls-btn/index.js';
import { applyFontIcons } from '../../utils';

videojs.registerComponent('SettingButton', SettingButton);

const VideoPlayer = memo(forwardRef((props: VideoOptions, playerRef: any) => {
  const { options, initSuccess, } = props;
  const videoRef = useRef<any>();

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
      playerRef.current.controlBar.addChild('SettingButton', {}, 16);
    }
  };

  return (
    <div className="video-js-custom">
      <video ref={videoRef} className="video-js">
      </video>
    </div>
  );
}));

export default VideoPlayer;
