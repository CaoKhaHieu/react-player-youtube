export type SubtitleActions = 'SWITCH' | 'TURNOFF' | 'GET_CURRENT_SUB';
export interface VideoOptions {
  options: any;
  subtitles?: SubtitleItem[];
  initSuccess?: () => void;
};

export interface MenuSettingItem {
  id: string;
  label: string;
  icon: JSX.Element;
  options: Array<{ label: string; value: number | string, isDefault?: boolean, url?: string }>;
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
