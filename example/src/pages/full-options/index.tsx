import { VideoPlayer } from 'react-player-youtube';
import MetaData from '../../components/meta-data';
import { useRef } from 'react';

const urlVideo =
  'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
const typeVideo = 'application/x-mpegURL';

// const urlVideo = 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4';
// const typeVideo
const source = {
  src: urlVideo,
  type: typeVideo,
};

const subtitles = [
  {
    isDefault: true,
    value: 'en',
    label: 'English',
    url: 'https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt',
  },
  {
    isDefault: false,
    value: 'ar',
    label: 'Arabic',
    url: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.ar.vtt',
  },
  {
    value: 'sw',
    label: 'Swedish',
    url: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.sv.vtt',
    isDefault: false,
  },
];

const VideoFullOptions = () => {
  const playerRef = useRef();
  return (
    <div className='video-player'>
      <VideoPlayer
        ref={playerRef}
        source={source}
        subtitles={subtitles}
        miniPlayerFooter={<MetaData />}
      />
    </div>
  );
};

export default VideoFullOptions;
