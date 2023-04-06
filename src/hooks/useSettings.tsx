import React, { useState } from 'react';
import { useVideoPlayer } from '../components/video-player';
import { SubtitleItem } from '../types';
import { CAPTIONS, SUBTITLE_ACTIONS, SUBTITLE_MODE, SUBTITLE_OFF } from '../constants';

export type SUBTITLE_ACTIONS = 'SWITCH' | 'TURNOFF' | 'GET_CURRENT_SUB';

const useSettings = () => {
  const { playerRef } = useVideoPlayer();
  const tracks = playerRef?.current?.textTracks();

  const handleSpeedVideo = (value: number) => {
    playerRef.current.playbackRate(value);
  };

  const handleSubtitle = (
    action: SUBTITLE_ACTIONS,
    item?: SubtitleItem,
    callback?: (track: TextTrack) => void,
  ) => {
    if (tracks) {
      const actions = {
        [SUBTITLE_ACTIONS.SWITCH]: (track: TextTrack) => {
          if (item && item.value === SUBTITLE_OFF) {
            actions[SUBTITLE_ACTIONS.TURNOFF](track);
            return;
          }
          if (track.kind === CAPTIONS && track.language === item?.value) {
            track.mode = SUBTITLE_MODE.SHOWING as TextTrackMode;
          } else {
            track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
          }
        },
        [SUBTITLE_ACTIONS.TURNOFF]: (track: TextTrack) => {
          track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
        },
        [SUBTITLE_ACTIONS.GET_CURRENT_SUB]: (track: TextTrack) => {
          if (track.kind === CAPTIONS && track.mode === SUBTITLE_MODE.SHOWING) {
            callback && callback(track);
          }
        }
      };
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        actions[action](track);
      }
    }
  };

  return {
    handleSpeedVideo,
    handleSubtitle,
  };
};

export default useSettings;
