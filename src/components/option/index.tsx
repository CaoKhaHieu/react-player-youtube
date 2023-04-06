import React, { ReactElement } from 'react';
import './style.scss';

export interface OptionData {
  icon?: ReactElement;
  label: string;
  value?: number;
}

export interface IOption {
  option: OptionData;
  alwaysShowIcon?: boolean;
  active?: boolean;
  onClick: () => void;
}

const Option = (props: IOption) => {
  const { option, active, alwaysShowIcon, ...otherProps } = props;

  return (
    <div className='option' {...otherProps}>
      <div className='icon'>
        {(alwaysShowIcon || active) && option.icon}
      </div>
      <div className='content'>
        {option.label}
      </div>
      <div className='value'>
      </div>
    </div>
  );
};

export default Option;
