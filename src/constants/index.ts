import { SubtitleItem } from "../types";

export const ERRORS = {
  NO_CONTEXT: 'No Context',
};

export const PLAYER_CONFIG = {
  SPEED_CONTROL: 1,
  SUBTITLES: 2,
};

export const LIBRARY_NAME = 'REACT_PLAYER_YOUTUBE';

export const dummySubtitles: SubtitleItem[] = [
  {
    isDefault: true,
    value: 'off',
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
    url: 'https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt'
  },
];
