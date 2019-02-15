import { Directive, Input, SimpleChanges } from '@angular/core';
import { BsapiService } from './bsapi.service';

// TODO:
// not in use
// delete or use instead of bs-artwork component


@Directive({
  selector: 'img [bsArtwork]'
})
export class BsArtworkDirective {

  @Input() albumid: string;
  @Input() artistid: string;
  @Input() service: string;
  src = '';
  constructor(private bsapi: BsapiService) { }

  ngOnInit() {
  }

  ngOnChanges(_: SimpleChanges) {
    if (this.albumid && this.service) {
      this.src = this.bsapi.getAlbumArt(this.albumid, this.service);
    } else if (this.artistid && this.service) {
      this.src = this.bsapi.getArtistArt(this.artistid, this.service);
    } else {
      this.src = '';
    }
  }

}
