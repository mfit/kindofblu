import { Component, OnInit } from '@angular/core';
import { BsapiService } from 'src/app/core/bsapi.service';
import { ServiceSourceService } from '../../settings/service-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom, mergeMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.css']
})
export class ArtistViewComponent implements OnInit {
  albums$;
  constructor(
    private bsapi: BsapiService,
    private service: ServiceSourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.albums$ = this.route.paramMap.pipe(
      withLatestFrom(this.service.getService()),
      mergeMap(([params, service]) =>
        this.bsapi.getAlbumsOfArtist(params.get('artistid'), service)
      ),
      map(albumResult => {
        albumResult.albums = albumResult.albums.map(album => {
          album['service'] = albumResult.service;
          return album;
        });
        return albumResult;
      }),
      tap(res => console.log(res))
    );
  }

  albumClick(album) {
    this.router.navigate(['/album', album.albumid]);
  }
}
