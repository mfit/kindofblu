import { Action, createReducer, on } from '@ngrx/store';
import * as PlayerActions from './player.actions';
import { PlayerStatus, PlaylistEntry, ActivePlaylistEntry } from '../shared/api/interfaces';
import { state } from '@angular/animations';

export const PlayerFeatureKey = 'player';

export interface PlayerState {
  status: PlayerStatus;
  hasConnection: boolean;
  fetchStatus: boolean;
  songPlaying: string;
  currentPlaylist: Array<PlaylistEntry>;
  playlistWindow: Array<ActivePlaylistEntry>;
}

export const initialState = {
  status: null,
  hasConnection: false,
  fetchStatus: true,
  songPlaying: '',
  currentPlaylist: [],
  playlistWindow: []
};

const playerReducer = createReducer(
  initialState,
  on(PlayerActions.statusUpdateRcvd, (state, { status }) => ({
    ...state,
    status: status,
    hasConnection: true,
    songPlaying: [status.song, status.state].join('-')
  })),
  on(PlayerActions.statusUpdateFailed, state => ({
    ...state,
    status: null,
    hasConnection: false
  })),
  on(PlayerActions.playlistUpdateRcvd, (state, { tracks }) => ({
    ...state,
    currentPlaylist: (tracks || []),
    playlistWindow: (tracks || [])
      .filter(entry => entry.id >= (state.status.song || 5) - 5 && entry.id < (state.status.song || 5) + 25)
      .map(entry => ({ ...entry, playing: entry.id === state.status.song }))
  }))
);

export function reducer(state: PlayerState | undefined, action: Action) {
  return playerReducer(state, action);
}
