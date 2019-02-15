import { Component, OnInit, Input } from '@angular/core';
import { AlbumSong } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-albumsong',
  templateUrl: './albumsong.component.html',
  styleUrls: ['./albumsong.component.css']
})
export class AlbumsongComponent implements OnInit {
  @Input() song: AlbumSong;
  constructor() { }
  ngOnInit() {
  }
}
