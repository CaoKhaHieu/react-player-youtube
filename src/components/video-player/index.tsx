import React, { forwardRef, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.scss';
import { VideoOptions } from '../../types';

const VideoPlayer = forwardRef((props: VideoOptions, playerRef: any) => {
  const { options, initSuccess, } = props;
  const videoRef = useRef<any>();

  useEffect(() => {
    initPlayer();
  }, []);

  const initPlayer = () => {
    if (!playerRef.current) {
      const newPlayer = videojs(videoRef.current, options, () => {
        playerRef.current = newPlayer;
        if (typeof initSuccess === 'function') {
          initSuccess();
        }
      });
    }
  };

  return (
    <div className="video-js-custom">
      <video ref={videoRef} className="video-js">
      </video>
    </div>
  );
});

export default VideoPlayer;
