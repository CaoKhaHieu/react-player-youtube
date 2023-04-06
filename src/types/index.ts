export interface VideoOptions {
  options: any;
  initSuccess?: () => void;
};

export interface MenuSettingItem {
  id: string;
  label: string;
  icon: JSX.Element;
  options: Array<{ label: string; value: number }>;
}

export interface MenuSettings {
  [key: string]: MenuSettingItem;
}
