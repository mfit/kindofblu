import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, withLatestFrom, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BsapiService } from 'src/app/shared/bsapi.service';
import { ServiceSourceService } from '../service-source.service';
import { Album } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

  album$: Observable<Album>;
  service$: Observable<string>;
  constructor(private route:ActivatedRoute,
    private service: ServiceSourceService,
    private bsapi: BsapiService) {
  }

  ngOnInit() {
    this.service$ = this.service.getService();

    this.album$ = this.route.paramMap.pipe(
      withLatestFrom(this.service$),
      mergeMap(([params, service]) => this.bsapi.getSongsOfAlbum(params.get('albumid'), service)),
      share());
  }

}
