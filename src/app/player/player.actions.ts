import { createAction, props } from '@ngrx/store';
import { PlayerStatus, PlaylistEntry } from '../shared/api/interfaces';

export const volumeUp = createAction('[Player] Volume Up');
export const volumeDown = createAction('[Player] Volume Down');
export const play = createAction('[Player] Play');
export const pause = createAction('[Player] Pause');
export const skipNext = createAction('[Player] Skip Next');
export const skipPrevious = createAction('[Player] Skip Previous');
export const removeSong = createAction('[Player] Remove Song', props<{ song: PlaylistEntry }>());
export const setVolume = createAction('[Player] Volume Set', props<{ volume: number }>());

// TODO:
export const skipToSong = createAction('[Player] Skip To Song', props<{ song: PlaylistEntry }>());

export const playerActionOk = createAction('[Player] Action Ok');
export const playerActionFail = createAction('[Player] Action Fail');

export const statusUpdate = createAction('[PlayerStatus] Get');
export const statusUpdateRcvd = createAction(
  '[PlayerStatus] Update',
  props<{ status: PlayerStatus }>()
);
export const statusUpdateFailed = createAction('[PlayerStatus] Update Failed');

export const playlistUpdate = createAction('[Playlist] Update');
export const playlistUpdateRcvd = createAction(
  '[Playlist] Update Rcvd',
  props<{ tracks: Array<PlaylistEntry> }>()
);


