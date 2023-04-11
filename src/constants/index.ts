import { SubtitleItem } from "../types";

export const ERRORS = {
  NO_CONTEXT: 'No Context',
};

export const PLAYER_CONFIG = {
  SPEED_CONTROL: 'SPEED_CONTROL',
  SUBTITLES: 'SUBTITLES',
  BACKGROUND: 'backgroundColor',
  COLOR: 'color',
  FONT_PERCENT: 'fontPercent',
  TEXT_OPACITY: 'textOpacity',
  BACKGROUND_OPACITY: 'backgroundOpacity',
  QUALITY: 'QUALITY'
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

export const dummySubtitle: SubtitleItem = {
  isDefault: false,
  value: SUBTITLE_OFF,
  label: 'Off',
};
