import React, { ReactElement, useEffect, useRef } from 'react';
import { useVideoPlayer } from '..';
import './style.scss';

interface MiniPlayerOptions {
  children?: ReactElement;
}

const MiniPlayer = (props: MiniPlayerOptions) => {
  const { children } = props;
  const miniPlayerRef = useRef<any>();
  const { playerElementRef } = useVideoPlayer();

  useEffect(() => {
    miniPlayerRef.current.appendChild(playerElementRef.current);
  }, []);

  return (
    <div className='mini-player'>
      <div ref={miniPlayerRef}></div>
      {children && children}
    </div>
  );
};

export default MiniPlayer;
