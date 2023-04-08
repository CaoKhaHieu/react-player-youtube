import { LIBRARY_NAME } from "../constants";

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
