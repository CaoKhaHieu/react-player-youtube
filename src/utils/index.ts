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

export const getConfigSetting = (key: string, otherValue: { label: string, value: string | number}) => {
  const dataLocal = getDataLocal();
  return {
    label: dataLocal[key] ? dataLocal[key]?.label : otherValue.label,
    value: dataLocal[key] ? dataLocal[key]?.value : otherValue.value,
  };
};