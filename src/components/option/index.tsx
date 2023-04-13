import React from 'react';
import './style.scss';
import Icon from '../icon';

export interface IOption {
  isRadio: boolean;
  label: string;
  labelCurrentValue: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const Option = (props: IOption) => {
  const { isRadio, label, labelCurrentValue, active, icon, ...otherProps } =
    props;

  return (
    <div className='option' {...otherProps}>
      {icon && (
        <div className='option-icon'>
          <Icon className='material-symbols-outlined' content={icon} />
        </div>
      )}
      {isRadio && (
        <div className='option-icon'>
          {active && (
            <Icon className='material-symbols-outlined' content='check_small' />
          )}
        </div>
      )}
      <div className='option-label'>{label}</div>
      {!isRadio && (
        <div className='option-content'>
          <div className='value'>{labelCurrentValue || ''}</div>
          <div className='icon'>
            <Icon
              className='material-symbols-outlined'
              content='keyboard_arrow_right'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Option;
