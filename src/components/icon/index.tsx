import React from 'react';
import './index.scss';
import classNames from 'classnames';

interface IconOptions {
  className: string;
  content: string;
}

const Icon = (props: IconOptions) => {
  const { className, content } = props;

  return (
    <span className={classNames('icon', className)}>
      {content}
    </span>
  );
};

export default Icon;
