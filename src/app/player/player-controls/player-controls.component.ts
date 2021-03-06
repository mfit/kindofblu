import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PlayerState, getPlayerState } from '../player.reducers';
import { filter, map, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { PlayerStatus } from 'src/app/shared/api/interfaces';
import { Observable, Subject } from 'rxjs';

import * as playerActions from '../player.actions';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit, OnDestroy {
  status$: Observable<PlayerStatus>;
  volume$;
  volume;
  destroyed$ = new Subject();
  constructor(private store: Store<{ player: PlayerState }>) {}
  ngOnInit() {
    const store$ = this.store.pipe(select(getPlayerState));
    this.status$ = store$.pipe(select('status'));

    // TODO: volume value + volume change needs better handling
    const volume$ = this.status$.pipe(
      filter(status => !!status),
      map(status => status.volume),
      distinctUntilChanged(),
      debounceTime(1500)
    );
    volume$.pipe(takeUntil(this.destroyed$)).subscribe(v => (this.volume = v));
  }

  ngOnDestroy() {
    this.destroyed$.next();
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

  volumeSliderChange($ev) {
    this.store.dispatch(playerActions.setVolume({ volume: this.volume }));
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
