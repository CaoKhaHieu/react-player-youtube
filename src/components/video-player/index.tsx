import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.css'

const urlVideo = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
const typeVideo = 'application/x-mpegURL';

const VideoPlayer = () => {
  const videoRef = useRef<any>();
  const playerRef = useRef<any>();

  useEffect(() => {
    initPlayer();
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
    <div>
      <video ref={videoRef}></video>
    </div>
  );
};

export default VideoPlayer;
