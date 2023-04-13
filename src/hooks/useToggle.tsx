import React, { useState } from 'react';

const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle((prevValue) => !prevValue);
  };

  return {
    toggle,
    handleToggle,
  };
};

export default useToggle;
