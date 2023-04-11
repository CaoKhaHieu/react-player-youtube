export type SubtitleActions = 'SWITCH' | 'TURNOFF' | 'GET_CURRENT_SUB';
export interface VideoOptions {
  options: any;
  subtitles?: SubtitleItem[];
  isStreaming?: boolean;
  initSuccess?: () => void;
};

export interface MenuSettingItem {
  id: string;
  label: string;
  icon?: string;
  options: Array<{ label: string; value: number | string, isDefault?: boolean, url?: string, isRadio?: boolean, }>;
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
};

export interface QualityVideo {
  label: string;
  value: number;
};

export class QualityVideo {
  constructor(data: any) {
    this.label = `${data?.height}p`;
    this.value = data?.bandwidth;
  }
};
