import React, { useState } from 'react';
import { useVideoPlayer } from '../components/video-player';
import { SubtitleActions, SubtitleItem } from '../types';
import { CAPTIONS, PLAYER_CONFIG, SUBTITLE_ACTIONS, SUBTITLE_MODE, SUBTITLE_OFF } from '../constants';

const useSettings = () => {
  const { playerRef, handleChooseSublanguage, handleConfigSetting }: any = useVideoPlayer();
  const tracks = playerRef?.current?.textTracks();

  const handleSpeedVideo = (data: { label: string, value: number}) => {
    handleConfigSetting({
      [PLAYER_CONFIG.SPEED_CONTROL]: {
        label: data.label,
        value: data.value,
      },
    });
    playerRef.current.playbackRate(data.value);
  };

  const handleSubtitle = (
    action: SubtitleActions,
    subtitle: SubtitleItem,
    callback: (track: TextTrack) => void,
    tracksList: TextTrackList = tracks
  ) => {
    if (tracksList) {
      const actions = {
        [SUBTITLE_ACTIONS.SWITCH]: (track: TextTrack) => {
          const configSub = {
            [PLAYER_CONFIG.SUBTITLES]: {
              label: subtitle.label,
              value: subtitle.value,
            },
          };
          if (track.kind === CAPTIONS && track.language === subtitle.value) {
            subtitle.value !== SUBTITLE_OFF && handleChooseSublanguage(subtitle);
            track.mode = SUBTITLE_MODE.SHOWING as TextTrackMode;
          } else {
            track.mode = SUBTITLE_MODE.DISABLED as TextTrackMode;
          }
          toggleSubtitleBtn(playerRef, subtitle.value);
          handleConfigSetting(configSub);
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
      for (let i = 0; i < tracksList.length; i++) {
        const track = tracksList[i];
        actions[action](track);
      }
    }
  };

  const toggleSubtitleBtn = (player: any = playerRef, value: string) => {
    const subtitleButton = player?.current?.controlBar?.subsCapsButton?.el();
    if (subtitleButton) {
      const hasActive = subtitleButton?.classList?.contains('active');
      if (subtitleButton && value === SUBTITLE_OFF) {
        hasActive && subtitleButton?.classList?.remove('active');
      } else {
        !hasActive && subtitleButton?.classList?.add('active');
      }
    }
  };

  return {
    handleSpeedVideo,
    handleSubtitle,
    toggleSubtitleBtn,
  };
};

export default useSettings;
