import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, withLatestFrom, share, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BsapiService } from 'src/app/core/bsapi.service';
import { ServiceSourceService } from '../../settings/service-source.service';
import { Album } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

  album$: Observable<Album>;
  service$: Observable<string>;
  constructor(private route: ActivatedRoute,
    private service: ServiceSourceService,
    private bsapi: BsapiService) {
  }

  ngOnInit() {
    this.service$ = this.service.getService();

    this.album$ = this.route.paramMap.pipe(
      withLatestFrom(this.service$),
      mergeMap(([params, service]) => this.bsapi.getSongsOfAlbum(params.get('albumid'), service)),
      map(albumdata => {
        // The album has no title or any metadata
        // Get the title (it should be just one) from the album's songs
        const albumtitlesFromSongs = albumdata.songs.map(song => song.alb).reduce((cur, next) => {
          if (cur.indexOf(next) === -1) {
            cur.push(next);
          }
          return cur;
        }, []);
        return {...albumdata, albumTitles: albumtitlesFromSongs};
      }),
      share());
  }

}
