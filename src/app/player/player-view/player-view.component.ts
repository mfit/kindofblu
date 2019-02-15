import { Component, OnInit } from '@angular/core';
import { BsapiService } from 'src/app/shared/bsapi.service';
import { Observable, } from 'rxjs';
import { mergeMap, tap, take, filter, map, withLatestFrom, distinctUntilChanged, debounceTime, shareReplay } from 'rxjs/operators';
import { BsstatusService } from 'src/app/shared/bsstatus.service';
import { PlayerStatus, Playlist, ActivePlaylistEntry, PlaylistEntry } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {
  status$: Observable<PlayerStatus>;
  playlist$: Observable<Playlist>;
  songs$: Observable<ActivePlaylistEntry[]>;
  volume:number;

  // viewStyle$ = new BehaviorSubject<number>(1);

  sessionPlaylistStart: number;

  constructor(private api: BsapiService,
    private statusService: BsstatusService) { }

  ngOnInit() {

    this.status$ = this.statusService.status$;

    // Playlist entry of first status of session
    // TODO : move to service (with all the other playlist stuff)
    this.statusService.status$.pipe(
      filter(v => !!v),
      map(v => v.song),
      take(1)
    ).subscribe(v => this.sessionPlaylistStart = v);

    this.playlist$ = this.statusService.statusTrackChange$
      .pipe(
        mergeMap(_ => this.api.getCurrentPlaylist())
      );

    const allSongs = this.playlist$.pipe(
      map(playlist => playlist.songs),
      withLatestFrom(this.status$),
      tap(v => console.log(v)),

      // mark currently playing
      map(([songs, status]) => {
        return songs.map(entry => Object.assign(entry, {playing: entry.id === status.song}))
      }),
      shareReplay(1, 1000 * 30)
    );

    const upcomingSongs = allSongs.pipe(
      // extract a window of around 20, just around the currently playing entry
      withLatestFrom(this.status$),
      map(([songs, status]) => {
        return songs.filter(entry => entry.id >= (this.sessionPlaylistStart || status.song)-5)
      })
    );

    this.songs$ = upcomingSongs;
    // this.songs$ = allSongs;

    // this.viewStyle$.pipe(
    //   switchMap(viewstyle => {
    //     switch(viewstyle) {
    //       case 0: return allSongs;
    //       case 1: return upcomingSongs;
    //       default: return of([]);
    //     }
    //   })).subscribe(v =>
    //     console.log("switched", v)
    //   );

    this.status$.pipe(
      filter(v => !!v),
      map(v => v.volume),
      distinctUntilChanged(),
      debounceTime(1500)
      ).subscribe(v => {
        this.volume = v;
    });
  }

  // switchView() {
  //   const current = this.viewStyle$.getValue();
  //   this.viewStyle$.next(current === 1 ? 0 : 1);
  // }

  clear() {
    this.api.playlistClear().subscribe();
  }

  next() {
    const currentSong = this.statusService.getStatus().song;
    this.api.playSong(currentSong + 1).subscribe();
  }

  prev() {
    const currentSong = this.statusService.getStatus().song;
    this.api.playSong(currentSong - 1).subscribe();
  }

  play() {
    this.api.play().subscribe();
  }

  jumpTo(song: PlaylistEntry) {
    this.api.playSong(song.id).subscribe();
  }

  clearPlaylistEntry(song: PlaylistEntry) {
    this.api.clearSong(song.id).subscribe(_ => {});
  }

  pause() {
    this.api.pause().subscribe();
  }

  volumeSliderChange($ev) {
    this.api.setVolume(this.volume).subscribe();
  }

  incVol() {
    this.volume += 1;
    this.api.setVolume(this.volume).subscribe();
  }

  decVol() {
    this.volume -= 1;
    this.api.setVolume(this.volume).subscribe();
  }

  _volumeTransform(val) {
    return val + ' %';
  }

}
