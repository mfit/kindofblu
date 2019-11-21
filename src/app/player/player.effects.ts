import * as PlayerActions from './player.actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BsapiService } from '../core/bsapi.service';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  delay,
  withLatestFrom,
  filter,
  tap,
  debounceTime
} from 'rxjs/operators';
import { PlayerState, PlayerFeatureKey } from './player.reducers';
import { BsstatusService } from '../core/bsstatus.service';

@Injectable()
export class PlayerEffects {
  fetchStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.statusUpdate),
      debounceTime(750),
      mergeMap(() => {
        return this.bsstatus.fetchStatus().pipe(
          map(status => ({ type: PlayerActions.statusUpdateRcvd.type, status: status })),
          catchError(() => of({ type: PlayerActions.statusUpdateFailed.type }))
        );
      })
    )
  );

  requestStatusAgain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.statusUpdateRcvd),
      mergeMap(() => {
        return of({ type: PlayerActions.statusUpdate.type }).pipe(delay(800));
      })
    )
  );

  // signalTrackChange$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PlayerActions.statusUpdateRcvd),
  //     withLatestFrom(this.store.pipe(select(PlayerFeatureKey))),
  //     filter(([action, state]) => {
  //       const now = [action.status.song, action.status.state].join('-');
  //       return !(now === state.songPlaying);
  //     }),
  //     tap(v => console.log('did signal!')),
  //     mergeMap(([action, state]) => {
  //       return of({ type: PlayerActions.playlistUpdate.type });
  //     })
  //   )
  // );

  requestPlaylistOnChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PlayerActions.play,
        PlayerActions.skipNext,
        PlayerActions.skipPrevious,
        PlayerActions.skipToSong,
        PlayerActions.pause
      ),
      tap(v => console.log('requesting!')),
      mergeMap(() => of({ type: PlayerActions.playlistUpdate.type }))
    )
  );

  requestPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.playlistUpdate),
      withLatestFrom(this.store.pipe(select(PlayerFeatureKey))),
      mergeMap(([action, state]) => {
        return this.bsapi.getCurrentPlaylist().pipe(
          map(data => ({ type: PlayerActions.playlistUpdateRcvd.type, tracks: data.songs })),
          catchError(() => of({ type: PlayerActions.playlistUpdateRcvd.type, tracks: [] }))
        );
      })
    )
  );

  playerPause$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.pause),
      mergeMap(() => {
        return this.bsapi.pause().pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playerPlay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.play),
      mergeMap(() => {
        return this.bsapi.play().pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playerSkipNext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.skipNext),
      withLatestFrom(this.store.pipe(select(PlayerFeatureKey))),
      mergeMap(([action, state]) => {
        const currentSong = state.status.song;
        return this.bsapi.playSong(currentSong + 1).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playerSkipPrev$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.skipPrevious),
      withLatestFrom(this.store.pipe(select(PlayerFeatureKey))),
      mergeMap(([action, state]) => {
        const currentSong = state.status.song;
        return this.bsapi.playSong(currentSong - 1).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playerVolUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.volumeUp),
      withLatestFrom(this.store.pipe(select(PlayerFeatureKey))),
      mergeMap(([action, state]) => {
        const currentVolume = state.status.volume;
        return this.bsapi.setVolume(currentVolume + 1).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playerVolDown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.volumeDown),
      withLatestFrom(this.store.pipe(select(PlayerFeatureKey))),
      mergeMap(([action, state]) => {
        const currentVolume = state.status.volume;
        return this.bsapi.setVolume(currentVolume - 1).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playerVolumeSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setVolume),
      mergeMap(({ volume }) => {
        return this.bsapi.setVolume(volume).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playlistRemoveSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.removeSong),
      mergeMap(({ song }) => {
        return this.bsapi.clearSong(song.id).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  playlistJumpToSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.skipToSong),
      mergeMap(({ song }) => {
        return this.bsapi.playSong(song.id).pipe(
          map(() => ({ type: PlayerActions.playerActionOk.type })),
          catchError(() => of({ type: PlayerActions.playerActionFail.type }))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private bsapi: BsapiService,
    private bsstatus: BsstatusService,
    private store: Store<PlayerState>
  ) {}
}
