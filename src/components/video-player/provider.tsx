import React, { createContext, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { ButtonControl } from 'types';
import { ERRORS } from '@constants/index';

export const VideoContext = createContext<any>({});

export const usePlayer = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw Error(ERRORS.NO_CONTEXT);
  }
  return context;
};

const VideoPlayerProvider = (props: any) => {
  // HIDE BUTTON
  const hideButton = (player: any, btns: ButtonControl[]) => {
    if (btns.includes('PrevButton')) {
      const playButton = player.current.controlBar.getChild('PlayToggle').el();
      playButton.classList.add('vjs-first-button-control');
    }
    btns.forEach((btnName: ButtonControl) => {
      const btnElement = player.current.controlBar.getChild(btnName);
      btnElement.hide();
    });
  };

  const valueContext = {
    hideButton,
  };

  return (
    <VideoContext.Provider value={valueContext}>
      <Helmet>
        <link rel='preload' href='https://fonts.googleapis.com' />
        <link rel='preload' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&family=Rubik+Vinyl&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
        />
      </Helmet>
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoPlayerProvider;
