import React from 'react';
import './style.scss';
import classNames from 'classnames';

interface IconOptions {
  className: string;
  content: string;
  onClick?: () => void;
}

const Icon = (props: IconOptions) => {
  const { className, content, onClick } = props;

  return (
    <span className={classNames('icon', className)} onClick={onClick}>
      {content}
    </span>
  );
};

export default Icon;
