import React from 'react';
import './style.scss';

const Option = (props: any) => {
  const { option } = props;

  return (
    <div className='option'>
      <div className='icon'>
        {option.icon}
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
