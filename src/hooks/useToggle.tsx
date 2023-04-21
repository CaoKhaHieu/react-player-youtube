import React, { useState } from 'react';

const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = (value?: boolean) => {
    setToggle((prevValue) => value || !prevValue);
  };

  return {
    toggle,
    handleToggle,
  };
};

export default useToggle;
