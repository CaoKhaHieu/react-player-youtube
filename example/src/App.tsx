import './App.css';

import { Route, Routes } from 'react-router-dom';
import VideoFullOptions from './pages/full-options';
import VideoStreaming from './pages/streaming';
import Header from './components/header';
import Footer from './components/footer';
// const urlVideo =
//   'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
// const urlVideo = 'https://vod.dev2.lunativi.com/vods/4/yCbm6ZXk9kucNJfGzOo0_MEDIA_20230322-093606_1679452566475_LUPIYmp4/playlist.m3u8'
// const urlVideo = 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8';
// const urlVideo = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4';
// const typeVideo = 'video/mp4';
// const urlVideo2 =
//   'https://vod.dev2.lunativi.com/vods/4/Lp7XnCt69GyqiAoYmmyz_MEDIA_20230322-093606_1679452566475_GdVtPmp4/playlist.m3u8';
// const typeVideo = 'application/x-mpegURL';

// live url
// const urlVideoLive =
//   'https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8';

// const sourceMp4 = {
//   src: 'https://www.tutorialspoint.com/videos/sample1080p.mp4',
//   type: 'video/mp4',
// };

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<VideoFullOptions />} />
        <Route path='/streaming' element={<VideoStreaming />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
