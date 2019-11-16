import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BsapiService } from '../../core/bsapi.service';

@Component({
  selector: 'bs-artwork',
  templateUrl: './bs-artwork.component.html',
  styleUrls: ['./bs-artwork.component.css']
})
export class BsArtworkComponent implements OnInit, OnChanges {
  @Input() albumid: string;
  @Input() artistid: string;
  @Input() songid: string;
  @Input() service: string;
  src = '';
  constructor(private bsapi: BsapiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.albumid && this.service) {
      this.src = this.bsapi.getAlbumArt(this.albumid, this.service);
    } else if (this.songid && this.service) {
      this.src = this.bsapi.getSongArt(this.songid, this.service);
    } else if (this.artistid && this.service) {
      this.src = this.bsapi.getArtistArt(this.artistid, this.service);
    } else {
      this.src = '';
    }
  }

}
