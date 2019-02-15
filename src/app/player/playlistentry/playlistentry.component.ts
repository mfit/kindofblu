import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivePlaylistEntry, PlaylistEntry } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-playlistentry',
  templateUrl: './playlistentry.component.html',
  styleUrls: ['./playlistentry.component.scss']
})
export class PlaylistentryComponent implements OnInit {
  @Input() entry: ActivePlaylistEntry;
  @Output() play = new EventEmitter<PlaylistEntry>();
  @Output() clear = new EventEmitter<PlaylistEntry>();
  constructor() { }

  ngOnInit() {
  }

  jumpTo(entry: PlaylistEntry) {
    this.play.emit(entry);
  }

  clearEntry(entry: PlaylistEntry) {
    this.clear.emit(entry);
  }

}
