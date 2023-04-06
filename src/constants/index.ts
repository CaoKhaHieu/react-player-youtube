import { SubtitleItem } from "../types";

export const ERRORS = {
  NO_CONTEXT: 'No Context',
};

export const PLAYER_CONFIG = {
  SPEED_CONTROL: 'SPEED_CONTROL',
  SUBTITLES: 'SUBTITLES',
};

export const LIBRARY_NAME = 'REACT_PLAYER_YOUTUBE';

export const CAPTIONS = 'captions';
export const SUBTITLE_OFF = 'off';

export const SUBTITLE_MODE = {
  SHOWING: 'showing',
  DISABLED: 'disabled',
};

export const SUBTITLE_ACTIONS = {
  SWITCH: 'SWITCH',
  TURNOFF: 'TURNOFF',
  'GET_CURRENT_SUB': 'GET_CURRENT_SUB',
};

export const dummySubtitles: SubtitleItem[] = [
  {
    isDefault: true,
    value: SUBTITLE_OFF,
    label: 'Off',
  },
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
];
