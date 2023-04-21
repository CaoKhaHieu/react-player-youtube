import React, { useEffect, useRef } from 'react';
import { useVideoPlayer } from '..';
import './style.scss';

const MiniPlayer = () => {
  const miniPlayerRef = useRef<any>();
  const { playerElementRef } = useVideoPlayer();

  useEffect(() => {
    miniPlayerRef.current.appendChild(playerElementRef.current);
  }, []);

  return <div ref={miniPlayerRef} className='mini-player'></div>;
};

export default MiniPlayer;
