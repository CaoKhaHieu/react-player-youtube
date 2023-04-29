import { ReactElement } from 'react';
import { VideoJsPlayerOptions } from 'video.js';

export type SubtitleActions = 'SWITCH' | 'TURNOFF' | 'GET_CURRENT_SUB';
export type Mode = 'NORMAL' | 'MINI';
export type AdsType = 'CSAI' | 'SSAI';
export type ButtonControl =
  | 'SettingButton'
  | 'PrevButton'
  | 'NextButton'
  | 'MiniPlayerModeButton'
  | 'TheaterButton'
  | 'ExpandButton'
  | 'CloseButton';

export interface VideoOptions {
  privateKey: number;
  source: { type: string; src: string };
  options: VideoJsPlayerOptions;
  subtitles?: SubtitleItem[];
  isStreaming?: boolean;
  ads?: Ads;
  onReady?: () => void;
  onExpand?: () => void;
  onMini?: () => void;
  onDestroy?: () => void;
  miniPlayerFooter?: ReactElement;
}

export interface MenuSettingItem {
  id: string;
  label: string;
  icon?: string;
  options: Array<{
    label: string;
    value: number | string;
    isDefault?: boolean;
    url?: string;
    isRadio?: boolean;
  }>;
  child?: any;
  isRadio?: boolean;
}

export interface MenuSettings {
  [key: string]: MenuSettingItem;
}

export interface SubtitleItem {
  isDefault?: boolean;
  value: string;
  label: string;
  url?: string;
}

export interface QualityVideo {
  label: string;
  value: number;
}

export class QualityVideo {
  constructor(data: any) {
    this.label = `${data?.height}p`;
    this.value = data?.bandwidth;
  }
}

export interface Cue {
  identifier: string;
  start: number;
  end: number;
  styles: string;
  text: string;
}

export interface AdMarker {
  startTime: number;
  endTime: number;
}

export interface Ads {
  type: AdsType;
  adsMarker: AdMarker[];
}
