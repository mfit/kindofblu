import { Component, OnInit } from '@angular/core';
import { BsapiService } from 'src/app/core/bsapi.service';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';
import {
  PlayerStatus,
  Playlist,
  ActivePlaylistEntry,
  PlaylistEntry
} from 'src/app/shared/api/interfaces';
import { Store, select } from '@ngrx/store';
import { PlayerState, PlayerFeatureKey, getPlayerState } from '../player.reducers';
import { statusUpdate, playlistUpdate } from '../player.actions';
import * as playerActions from '../player.actions';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {
  status$: Observable<PlayerStatus>;
  playlist$: Observable<Playlist>;
  songs$: Observable<ActivePlaylistEntry[]>;
  volume: number;
  sessionPlaylistStart: number;

  constructor(
    private api: BsapiService,
    private store: Store<{ player: PlayerState }>
  ) {

    // Initiate status update
    // TODO : due to throttling, it shouldn create request-cascades .. but still does..
    this.store.dispatch(statusUpdate());

    const store$ = store.pipe(select(getPlayerState));
    this.status$ = store$.pipe(select('status'));

    // TODO: correctly dispatch playlist update (e.g. on "track change" event)
    setTimeout(() => {
      this.store.dispatch(playlistUpdate());
    }, 2000);

    this.songs$ = store$.pipe(select('playlistWindow'));

    store$.subscribe(console.log);

    // TODO: volume value + volume change needs better handling
    const volume$ = this.status$.pipe(
      filter(status => !!status),
      map(status => status.volume),
      distinctUntilChanged(),
      debounceTime(1500)
    );
    volume$.subscribe(v => (this.volume = v));
  }

  ngOnInit() {
  }

  clear() {
    this.api.playlistClear().subscribe();
  }

  next() {
    this.store.dispatch(playerActions.skipNext());
  }

  prev() {
    this.store.dispatch(playerActions.skipPrevious());
  }

  play() {
    this.store.dispatch(playerActions.play());
  }

  pause() {
    this.store.dispatch(playerActions.pause());
  }

  jumpTo(song: PlaylistEntry) {
    this.store.dispatch(playerActions.skipToSong({song: song}));
  }

  clearPlaylistEntry(song: PlaylistEntry) {
    this.store.dispatch(playerActions.removeSong({ song: song }));
  }

  volumeSliderChange($ev) {
    this.store.dispatch(playerActions.setVolume({volume: this.volume}));
  }

  incVol() {
    this.store.dispatch(playerActions.volumeUp());
  }

  decVol() {
    this.store.dispatch(playerActions.volumeDown());
  }

  _volumeTransform(val) {
    return val + ' %';
  }
}
