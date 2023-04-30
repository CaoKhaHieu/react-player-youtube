import React, { useRef } from 'react';
import { VideoPlayer } from 'react-player-youtube';
import MetaData from '../../components/meta-data';

const urlVideo =
  'https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8';
const typeVideo = 'application/x-mpegURL';
const source = {
  src: urlVideo,
  type: typeVideo,
};

const VideoStreaming = () => {
  const playerRef = useRef();

  return (
    <div className='video-player'>
      <VideoPlayer
        isStreaming
        ref={playerRef}
        source={source}
        miniPlayerFooter={<MetaData />}
      />
    </div>
  );
};

export default VideoStreaming;
