import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.scss';

// const urlVideo = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
const urlVideo = 'https://vod.dev2.lunativi.com/vods/4/Lp7XnCt69GyqiAoYmmyz_MEDIA_20230322-093606_1679452566475_GdVtPmp4/playlist.m3u8';
const typeVideo = 'application/x-mpegURL';

const VideoPlayer = () => {
  const videoRef = useRef<any>();
  const playerRef = useRef<any>();

  useEffect(() => {
    initPlayer();
    return () => {
      console.log('unmount')
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const initPlayer = () => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: urlVideo,
        type: typeVideo
      }]
    };
    playerRef.current = videojs(videoRef.current, videoJsOptions, () => {
      console.log('inited')
    });
  };

  return (
    <div className="video-js-custom">
      <video ref={videoRef} className="video-js">
      </video>
    </div>
  );
};

export default VideoPlayer;
