import React, { useState } from 'react';

const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const handleToggle = () => {
    setToggle((prevValue) => !prevValue);
  };

  return {
    toggle,
    handleToggle
  };
}

export default useToggle;
