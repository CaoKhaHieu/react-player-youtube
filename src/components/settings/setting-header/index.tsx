import React from 'react';
import './style.scss';
import Icon from '../../icon';

interface SettingHeaderOptions {
  title: string;
  hasChild: boolean;
  goBack: () => void;
  optionsClick: () => void;
}

const SettingHeader = (props: SettingHeaderOptions) => {
  const { goBack, title, hasChild, optionsClick } = props;

  return (
    <div className='setting-header'>
      <div className='header-left'>
        <Icon
          className='material-symbols-outlined pointer'
          content='keyboard_arrow_left'
          onClick={goBack}
        />
        <p className='header-title'>{title}</p>
      </div>
      {
        hasChild &&
        <div className='header-right' onClick={optionsClick}>
          Options
        </div>
      }
    </div>
  );
};

export default SettingHeader;
