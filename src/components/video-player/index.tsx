import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import videojs, { VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import { Helmet } from 'react-helmet';

import './style.scss';
import '../../stylesheets/style.scss';

import Settings from '../settings';
import { getConfigSetting, getDataLocal } from '../../utils';
import useToggle from '../../hooks/useToggle';
import {
  CloseButton,
  ExpandButton,
  MiniPlayerModeButton,
  NextButton,
  PrevButton,
  SettingButton,
  TheaterButton,
  VjsPlaceholder,
} from '../controls-btn/index.js';
import {
  AdMarker,
  Cue,
  Mode,
  QualityVideo,
  SubtitleActions,
  SubtitleItem,
  VideoOptions,
} from '../../types';
import {
  CAPTIONS,
  ERRORS,
  MODE,
  PLAYER_CONFIG,
  SUBTITLE_ACTIONS,
  SUBTITLE_MODE,
  SUBTITLE_OFF,
  TYPE_ADS,
  dummySubtitle,
} from '../../constants';
import { parse } from '../../utils/vttParser';
import { compile } from '../../utils/vttCompiler';
import MiniPlayer from './mini-player';

const VideoContext = createContext<any>({
  playerRef: null,
  subtitles: [],
  handleChooseSubLanguage: () => {},
  handleConfigSetting: () => {},
});

export const useVideoPlayer = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw Error(ERRORS.NO_CONTEXT);
  }

  return context;
};

// Register component
videojs.registerComponent('VjsPlaceholder', VjsPlaceholder);

// Register button
videojs.registerComponent('SettingButton', SettingButton);
videojs.registerComponent('PrevButton', PrevButton);
videojs.registerComponent('NextButton', NextButton);
videojs.registerComponent('MiniPlayerModeButton', MiniPlayerModeButton);
videojs.registerComponent('TheaterButton', TheaterButton);

// Mini player button
videojs.registerComponent('ExpandButton', ExpandButton);
videojs.registerComponent('CloseButton', CloseButton);

const VideoPlayer = forwardRef((props: VideoOptions, playerRef: any) => {
  const {
    privateKey,
    source,
    options,
    subtitles = [],
    ads,
    isStreaming,
    miniPlayerFooter,
    onReady,
    onExpand,
    onMini,
    onDestroy,
  } = props;
  const defaultSub =
    subtitles?.find((item: SubtitleItem) => item.isDefault) || dummySubtitle;

  const videoRef = useRef<any>();
  const videoNormalRef = useRef<any>();
  const playerElementRef = useRef<any>();
  const settingRef = useRef<any>();
  const hlsRef = useRef<any>();
  const listCues = useRef<Cue[][]>([]);

  const [configSetting, setConfigSetting] = useState({
    [PLAYER_CONFIG.SUBTITLES]: {
      label: 'Off',
      value: 'off',
    },
    [PLAYER_CONFIG.SPEED_CONTROL]: getConfigSetting(
      PLAYER_CONFIG.SPEED_CONTROL,
      { label: 'Normal', value: 1 },
    ),
    [PLAYER_CONFIG.BACKGROUND]: getConfigSetting(PLAYER_CONFIG.BACKGROUND, {
      label: 'Black',
      value: '#000',
    }),
    [PLAYER_CONFIG.COLOR]: getConfigSetting(PLAYER_CONFIG.COLOR, {
      label: 'White',
      value: '#FFF',
    }),
    [PLAYER_CONFIG.BACKGROUND_OPACITY]: getConfigSetting(
      PLAYER_CONFIG.BACKGROUND_OPACITY,
      { label: '100%', value: '1' },
    ),
    [PLAYER_CONFIG.FONT_PERCENT]: getConfigSetting(PLAYER_CONFIG.FONT_PERCENT, {
      label: '100%',
      value: 1,
    }),
    [PLAYER_CONFIG.TEXT_OPACITY]: getConfigSetting(PLAYER_CONFIG.TEXT_OPACITY, {
      label: '100%',
      value: '1',
    }),
    [PLAYER_CONFIG.FONT_FAMILY]: getConfigSetting(PLAYER_CONFIG.TEXT_OPACITY, {
      label: 'Proportional Sans-Serif',
      value: 'proportionalSansSerif',
    }),
    [PLAYER_CONFIG.EDGE_STYLE]: getConfigSetting(PLAYER_CONFIG.EDGE_STYLE, {
      label: 'None',
      value: 'none',
    }),
    [PLAYER_CONFIG.WINDOW_COLOR]: getConfigSetting(PLAYER_CONFIG.WINDOW_COLOR, {
      label: 'Black',
      value: '#000',
    }),
    [PLAYER_CONFIG.WINDOW_OPACITY]: getConfigSetting(
      PLAYER_CONFIG.WINDOW_OPACITY,
      { label: '100%', value: '1' },
    ),
  });
  const [inited, setInited] = useState<boolean>(false);
  const [subLanguage, setSubLanguage] = useState<SubtitleItem>(defaultSub);
  const [qualities, setQualities] = useState<QualityVideo[]>([]);
  const [mode, setMode] = useState<Mode>(MODE.NORMAL as Mode);

  const { toggle, handleToggle } = useToggle();

  useEffect(() => {
    if (source) {
      console.log(source)
      initPlayer();
      console.log('init')
    }
  }, [source]);

  useEffect(() => {
    if (mode === MODE.MINI && toggle) {
      handleToggle(false);
    }
  }, [mode]);

  useEffect(() => {
    if (playerRef.current) {
      watchSubtitleBtn();
    }
  }, [inited, subLanguage]);

  // INITPLAYER

  const initPlayer = () => {
    const videojsOptions: VideoJsPlayerOptions = {
      autoplay: true,
      fill: true,
      controls: true,
      sources: [source],
      controlBar: {
        currentTimeDisplay: !isStreaming,
        durationDisplay: !isStreaming,
        timeDivider: !isStreaming,
      },
      ...options,
    };
    const configPlayerDefault = getDataLocal();
      const newPlayer = videojs(videoRef.current, videojsOptions, () => {
        playerRef.current = newPlayer;
        playerRef.current.playbackRate(
          configPlayerDefault
            ? configPlayerDefault[PLAYER_CONFIG.SPEED_CONTROL].value
            : 1,
        );
        initBtnControls();
        initComponents();
        watchCustomButtons();
        if (subtitles?.length && !isStreaming) {
          if (ads?.type === TYPE_ADS.SSAI) {
            handleSubtitleSSAIVideo();
          } else {
            addTextTracks();
            showDefaultSubtitle();
          }
        }
        if (typeof onReady === 'function') {
          onReady();
        }
        setInited(true);
        watchEvents();
      });
  };

  const handleDisposeVideo = () => {
    playerRef.current.dispose();
  };

  // CUSTOM BUTTON
  const initBtnControls = () => {
    const settingBtn = playerRef.current.controlBar.getChild('SettingButton');
    const PrevButton = playerRef.current.controlBar.getChild('PrevButton');
    const NextButton = playerRef.current.controlBar.getChild('NextButton');
    const miniModeButton = playerRef.current.controlBar.getChild(
      'MiniPlayerModeButton',
    );

    const TheaterButton =
      playerRef.current.controlBar.getChild('TheaterButton');
    if (
      !settingBtn &&
      !PrevButton &&
      !NextButton &&
      !TheaterButton &&
      !miniModeButton
    ) {
      playerRef.current.controlBar.addChild(
        'SettingButton',
        {
          onClick: handleToggle,
        },
        isStreaming ? 11 : 15,
      );
      playerRef.current.controlBar.addChild('PrevButton', {}, 0);
      playerRef.current.controlBar.addChild('NextButton', {}, 2);
      playerRef.current.controlBar.addChild('ExpandButton', {});
      playerRef.current.controlBar.addChild('CloseButton', {});

      playerRef.current.controlBar.addChild('MiniPlayerModeButton', {}, 18);
      playerRef.current.controlBar.addChild(
        'TheaterButton',
        {},
        isStreaming ? 16 : 19,
      );
    }
  };

  const watchCustomButtons = () => {
    const miniModeButton = playerRef.current.controlBar.getChild(
      'MiniPlayerModeButton',
    );
    const expandButton = playerRef.current.controlBar.getChild('ExpandButton');
    const closeButton = playerRef.current.controlBar.getChild('CloseButton');

    miniModeButton.on('click', () => {
      handleChangeMode(MODE.MINI as Mode);
      if (typeof onMini === 'function') {
        onMini();
      }
    });

    expandButton.on('click', () => {
      handleChangeMode(MODE.NORMAL as Mode);
      if (typeof onExpand === 'function') {
        onExpand();
      }
    });

    closeButton.on('click', () => {
      handleDisposeVideo();
      if (typeof onDestroy === 'function') {
        onDestroy();
      }
    });
  };

  const initComponents = () => {
    playerRef.current.addChild('VjsPlaceholder');
  };

  // SAVE DATA SETTINGS

  const handleConfigSetting = (data: any) => {
    setConfigSetting((prev: any) => ({ ...prev, ...data }));
  };

  // SPEED VIDEO

  const handleSpeedVideo = (data: { label: string; value: number }) => {
    handleConfigSetting({
      [PLAYER_CONFIG.SPEED_CONTROL]: {
        label: data.label,
        value: data.value,
      },
    });
    playerRef.current.playbackRate(data.value);
  };

  // SUBTITLES

  const addTextTracks = () => {
    subtitles?.length &&
      subtitles.forEach((item: SubtitleItem) => {
        playerRef.current.addRemoteTextTrack(
          {
            src: item.url,
            kind: 'captions',
            srclang: item.value,
            label: item.label,
          },
          false,
        );
      });
  };

  const showDefaultSubtitle = () => {
    if (defaultSub) {
      handleSubtitle(
        SUBTITLE_ACTIONS.SWITCH as SubtitleActions,
        defaultSub,
        () => {},
      );
    }
  };

  const handleChooseSubLanguage = (language: SubtitleItem) => {
    setSubLanguage(() => language);
  };

  const watchSubtitleBtn = () => {
    const subtitleButton = playerRef.current.controlBar.subsCapsButton;
    // Clear event click registered previous
    subtitleButton.off('click');
    subtitleButton.on('click', () => {
      const hasActive =
        subtitleButton.el().classList?.contains('active') || false;
      const actions = {
        type: hasActive ? SUBTITLE_ACTIONS.TURNOFF : SUBTITLE_ACTIONS.SWITCH,
        label: hasActive ? 'Off' : subLanguage.label,
        value: hasActive ? SUBTITLE_OFF : subLanguage.value,
      };
      handleSubtitle(actions.type as SubtitleActions, subLanguage, () => {});
      toggleSubtitleBtn(actions.value);
      handleConfigSetting({
        [PLAYER_CONFIG.SUBTITLES]: {
          label: actions.label,
          value: actions.value,
        },
      });
    });
  };

  const handleSubtitle = (
    action: SubtitleActions,
    subtitle: SubtitleItem,
    callback: (track: TextTrack) => void,
  ) => {
    const tracksList = playerRef?.current?.textTracks();
    if (tracksList) {
      const actions = {
        [SUBTITLE_ACTIONS.SWITCH]: (track: TextTrack) => {
          const configSub = {
            [PLAYER_CONFIG.SUBTITLES]: {
              label: subtitle.label,
              value: subtitle.value,
            },
          };
          if (track.kind === CAPTIONS && track.language === subtitle.value) {
            subtitle.value !== SUBTITLE_OFF &&
              handleChooseSubLanguage(subtitle);
            track.mode = SUBTITLE_MODE.SHOWING as TextTrackMode;
          } else {
            track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
          }
          toggleSubtitleBtn(subtitle.value);
          handleConfigSetting(configSub);
        },
        [SUBTITLE_ACTIONS.TURNOFF]: (track: TextTrack) => {
          track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
        },
        [SUBTITLE_ACTIONS.GET_CURRENT_SUB]: (track: TextTrack) => {
          if (track.kind === CAPTIONS && track.mode === SUBTITLE_MODE.SHOWING) {
            callback && callback(track);
          }
        },
      };
      for (let i = 0; i < tracksList.length; i++) {
        const track = tracksList[i];
        actions[action](track);
      }
    }
  };

  const handleSubtitleSSAIVideo = () => {
    subtitles.forEach((item: SubtitleItem) => {
      item.url && fetchListCues(item.url);
    });
  };

  const fetchListCues = (url: string) => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        listCues.current.push(parse(data).cues);
        handleGenerateNewCues();
      });
  };

  const handleGenerateNewCues = () => {
    let newListCues = JSON.parse(JSON.stringify([...listCues.current]));

    ads?.adsMarker &&
      ads.adsMarker.forEach((adMarkerItem: AdMarker) => {
        const duration = adMarkerItem.endTime - adMarkerItem.startTime;

        newListCues = [...newListCues].map((listCue) => {
          let newListCueAdsInSub = [...listCue];
          // find ssai inserted when subtitles playing
          const indexCueAdsIn = newListCueAdsInSub.findIndex(
            (item) =>
              item.start < adMarkerItem.startTime &&
              item.end > adMarkerItem.startTime,
          );

          if (indexCueAdsIn !== -1) {
            // separate item in half
            const newList = JSON.parse(
              JSON.stringify(Array(2).fill(newListCueAdsInSub[indexCueAdsIn])),
            );
            newList[0].end = adMarkerItem.startTime;
            newList[1].start = adMarkerItem.startTime;

            // insert to list cue in position of cue
            newListCueAdsInSub.splice(indexCueAdsIn, 1, ...newList);
            newListCueAdsInSub = [...newListCueAdsInSub].map(
              (item, index: number) => {
                return { ...item, identifier: `${index + 1}` };
              },
            );
          }

          // update start time and end time of cue
          const newListCue = newListCueAdsInSub.map(
            (cue: Cue, index: number) => {
              if (newListCueAdsInSub[index]?.start >= adMarkerItem.startTime) {
                return {
                  ...cue,
                  start: cue.start + duration,
                  end: cue.end + duration,
                };
              }
              return cue;
            },
          );
          return newListCue;
        });
      });

    handleCompile(newListCues);
  };

  const handleCompile = (data: any) => {
    data.forEach((listCue: Cue[], index: number) => {
      const input = {
        cues: listCue,
        valid: true,
      };
      const vttText = compile(input);
      const vttBlob = new Blob([vttText], {
        type: 'text/plain',
      });
      playerRef.current.addRemoteTextTrack(
        {
          src: URL.createObjectURL(vttBlob),
          kind: 'captions',
          srclang: subtitles[index]?.value,
          label: subtitles[index]?.label,
        },
        false,
      );
    });
    showDefaultSubtitle();
  };

  const toggleSubtitleBtn = (value: string) => {
    const subtitleButton = playerRef?.current?.controlBar?.subsCapsButton?.el();
    if (subtitleButton) {
      const hasActive = subtitleButton?.classList?.contains('active');
      if (subtitleButton && value === SUBTITLE_OFF) {
        hasActive && subtitleButton?.classList?.remove('active');
      } else {
        !hasActive && subtitleButton?.classList?.add('active');
      }
    }
  };

  const updateStyleSubtitle = (
    data: { label: string; value: string | number },
    key: string,
  ) => {
    const settings = playerRef.current.textTrackSettings;
    const previousValue = settings.getValues();
    const newConfigSetting = {
      [key]: data,
    };
    // fix not update style when change  fontsize from 1 to other value
    if (data.value === 1 && key === PLAYER_CONFIG.FONT_PERCENT) {
      settings.setDefaults();
    }
    const newStyle = {
      ...previousValue,
      [key]: data.value,
    };
    settings.setValues(newStyle);
    settings.updateDisplay();
    handleConfigSetting(newConfigSetting);
  };

  const watchEvents = () => {
    playerRef.current.on('loadedmetadata', getListQualityVideo);
  };

  const getListQualityVideo = () => {
    const hls = playerRef.current.tech({ IWillNotUseThisInPlugins: true }).hls;
    hlsRef.current = hls;

    const listQualities = hlsRef.current.representations();
    const qualitiesMapping: QualityVideo[] = listQualities.map(
      (item: any) => new QualityVideo(item),
    );
    const sortedQualities: QualityVideo[] = qualitiesMapping.sort(
      (a: QualityVideo, b: QualityVideo) => b.value - a.value,
    );
    setQualities(sortedQualities);

    // Show default quality
    const defaultQuality = {
      label: `${hlsRef.current.selectPlaylist().attributes.RESOLUTION.height}p`,
      value: hlsRef.current.selectPlaylist().attributes.BANDWIDTH,
    };
    handleConfigSetting({
      [PLAYER_CONFIG.QUALITY]: defaultQuality,
    });
  };

  const handleChangeQualityVideo = (data: { label: string; value: number }) => {
    const listQualities = hlsRef.current.representations();
    listQualities.forEach((quality: any) => {
      quality.enabled(quality?.bandwidth === data.value);
    });
    handleConfigSetting({
      [PLAYER_CONFIG.QUALITY]: data,
    });
  };

  const handleChangeMode = (mode: Mode) => {
    if (mode === MODE.NORMAL) {
      videoNormalRef.current.appendChild(playerElementRef.current);
    }
    setMode(mode);
  };

  const valueContext = {
    playerElementRef,
    playerRef,
    // CONFIG SETTING
    configSetting,
    handleConfigSetting,
    // SPEED
    handleSpeedVideo,
    // SUBTITLE
    handleSubtitle,
    toggleSubtitleBtn,
    handleChooseSubLanguage,
    updateStyleSubtitle,
    subtitles: [dummySubtitle, ...subtitles],
    // quality video
    qualities,
    handleChangeQualityVideo,
    // streaming
    isStreaming,
  };

  return (
    <VideoContext.Provider value={valueContext}>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&family=Rubik+Vinyl&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
        />
      </Helmet>
      <div className='player' ref={videoNormalRef}>
        <div
          ref={playerElementRef}
          className={classNames('video-js-custom', {
            'tv-player': isStreaming,
          })}
        >
          <div data-vjs-player key={privateKey}>
            <video ref={videoRef} className='video-js'></video>
            {toggle && (
              <Settings ref={settingRef} handleToggle={handleToggle} />
            )}
          </div>
        </div>
        {mode === MODE.MINI && <MiniPlayer>{miniPlayerFooter}</MiniPlayer>}
      </div>
    </VideoContext.Provider>
  );
});

export default VideoPlayer;
