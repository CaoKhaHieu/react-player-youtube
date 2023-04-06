import React, { ReactElement } from 'react';
import './style.scss';
import Icon from '../icon';

export interface OptionData {
  icon?: ReactElement;
  label: string;
  value?: number;
}

export interface IOption {
  option: OptionData;
  alwaysShowIcon?: boolean;
  active?: boolean;
  hasOptionList?: boolean;
  currentValue?: any;
  onClick: () => void;
}

const Option = (props: IOption) => {
  const { option, active, alwaysShowIcon, hasOptionList, currentValue, ...otherProps } = props;

  return (
    <div className='option' {...otherProps}>
      <div className='option-icon'>
        {(alwaysShowIcon || active) && option.icon}
      </div>
      <div className='option-label'>
        {option.label}
      </div>
      {
        hasOptionList &&
        <div className='option-content'>
          <div className='value'>
            {currentValue || ''}
          </div>
          <div className='icon'>
            <Icon className='material-symbols-outlined' content='keyboard_arrow_right' />
          </div>
        </div>
      }
    </div>
  );
};

export default Option;
