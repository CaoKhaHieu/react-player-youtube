# react-player-youtube

A Simple player

## Demo

[https://fancy-taffy-aec1a6.netlify.app/](https://fancy-taffy-aec1a6.netlify.app/)

## Installation

    npm i react-player-youtube --save

## Feature

- Support load video mp4, m3u8, ...
- Custom UI streaming video
- Multiple qualities
- FullScreen cross browser support
- Mini mode
- Subtitles
- Speed control

## Usage

```js
import { VideoPlayerProvider } from 'react-player-youtube';
import App from './App';

<VideoPlayerProvider>
  <App />
</VideoPlayerProvider>;
```

```js
import { VideoPlayer } from 'react-player-youtube';

const urlVideo = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
const typeVideo = 'application/x-mpegURL';
const source = {
  src: urlVideo,
  type: typeVideo,
};

const playerRef = useRef();

<VideoPlayer ref={playerRef} source={source} />;
```

### Props

| Prop               | Description                             | Type                          | require |
| ------------------ | --------------------------------------- | ----------------------------- | ------- |
| privateKey         | A private key for video component       | number                        | `false` |
| source             | Include url and type of a video to play | { type: string; src: string } | `true`  |
| options            | Override default config of player       | VideoJsPlayerOptions;         | `false` |
| subtitles          | List subtitles                          | SubtitleItem                  | `false` |
| isStreaming        | Set player for streaming video          | VideoJsPlayerOptions;         | `false` |
| ads                | Adsense for video                       | Ads                           | false` |
| onReady            | Callback after init player              | () => void                    | false   |
| onExpand           | Callback open player with normal mode   | () => void                    | false   |
| onMini             | Callback open player with mini mode     | () => void                    | false   |
| onDestroy          | Callback close player                   | () => void                    | false   |
| miniPlayerFooter   | the element is below the mini player    | ReactElement                  | false   |
