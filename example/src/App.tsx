import { useRef, useState } from 'react';
import './App.css';

import { VideoPlayer} from '../../index';
import { AdsType } from '../../src/types';

const urlVideo = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
const urlVideo2 = 'https://vod.dev2.lunativi.com/vods/4/Lp7XnCt69GyqiAoYmmyz_MEDIA_20230322-093606_1679452566475_GdVtPmp4/playlist.m3u8';
const typeVideo = 'application/x-mpegURL';

// live url
// const urlVideo = 'https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8'

const MetaData = () => {
  return (
    <div>
      meta data
    </div>
  );
};

function App() {
  const options = {
    muted: true,
    fill: true,
    controls: true,
  };
  const playerRef = useRef<any>();
  const [config, setConfig] = useState({
    src: urlVideo,
    type: typeVideo
  });

  const [key, setKey] = useState(1);

  const onReady = () => {
    console.log('init success')
    // const btnSubtitle = playerRef.current.controlBar.getChild('SettingButton');
  }

  const subtitles = [
    {
      isDefault: true,
      value: 'en',
      label: 'English',
      url: 'https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt'
    },
    {
      isDefault: false,
      value: 'vn',
      label: 'Vietnamese',
      url: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.ar.vtt'
    },
    {
      value: "sw", 
      label: "Swedish", 
      url: "https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.sv.vtt", 
      isDefault: false
    }
  ];

  const changeSource = () => {
    const newSource = {
      src: urlVideo2,
      type: typeVideo
    }
    console.log('change src')
    setKey((prev) => prev + 1);
    setConfig(newSource)
  }

  const ads = {
    type: 'SSAI' as AdsType,
    adsMarker: [
      {
        startTime: 10,
        endTime: 15,
      },
      {
        startTime: 15,
        endTime: 35,
      },
      {
        startTime: 40,
        endTime: 50,
      }
    ]
  };

  const handleExpand = () => {
    console.log('expand')
  };

  const handleMini = () => {
    console.log('mini')
  };

  const handleDestroy = () => {
    console.log('huy')
  };
  
  return (
    <div className="App">
      <div className="video-player">
        <VideoPlayer
          privateKey={key}
          ads={ads} 
          ref={playerRef}
          source={config}
          options={options}
          subtitles={subtitles}
          onReady={onReady}
          onExpand={handleExpand}
          onDestroy={handleDestroy}
          onMini={handleMini}
          miniPlayerFooter={<MetaData />}
        />

        <button className='change-source' onClick={changeSource}>Change source</button>
      </div>
    </div>
  )
}

export default App;
