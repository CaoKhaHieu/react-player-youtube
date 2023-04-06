import { LIBRARY_NAME } from "../constants";

export const applyFontIcons = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  document.head.appendChild(link);
};

export const saveDataLocal = (key: string, value: any) => {
  const oldValueLocal = getDataLocal();
  const data = {
    ...oldValueLocal,
  };
  data[key] = value;

  return localStorage.setItem(LIBRARY_NAME, JSON.stringify(data));
};

export const getDataLocal = () => {
  const dataLocal = localStorage.getItem(LIBRARY_NAME);
  return dataLocal ? JSON.parse(dataLocal) : null;
};
