import React from 'react';
import './index.scss';

const Option = (props: any) => {
  const { option } = props;

  return (
    <div className='option'>
      <div className='icon'>
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
