import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BsapiService } from '../bsapi.service';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback.service';
import { mergeMap } from 'rxjs/operators';
import { ServiceSourceService } from 'src/app/player/service-source.service';

interface ContextAction {
  (item: any): void
}

class Option {
  constructor(public name: string, public action: ContextAction) {

  }
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  _item: any;

  @Input() set item(item) {
    this._item = item;
    this._buildOptions(item);
  }

  get item() {
    return this._item;
  }

  options = [
  ];

  constructor(private bsapi:BsapiService, private service: ServiceSourceService,
     private router: Router, private feedback: FeedbackService) { }

  ngOnInit() {
  }

  private _buildOptions(item) {
    if (!item) return [];

    let options = [];
    if (!!item.albumid) {
      options = options.concat([
        new Option('Go to album', (item) => this.actionGoToAlbum(item)),
        new Option('Add album', (item) => this.actionAddAlbum(item))
      ]);
    }

    if (!!item.artistid) {
      options = options.concat([
        new Option('Go to artist', (item) => this.actionGoToArtist(item)),
      ]);
    }

    if (!!item.songid) {
      options = options.concat([
        new Option('Add song', (item) => this.actionAddSong(item)),
      ]);
    }

    this.options = options;
  }

  private doAction(item, action) {
    action(item);
  }

  private actionGoToAlbum(item) {
    this.router.navigate(['/album', item.albumid]);
  }

  // TODO: take service from item , if possible !
  private actionAddAlbum(item) {
    const request = this.service.getService()
      .pipe(mergeMap(service => {
        return this.bsapi.addAlbum(item.albumid, service)
      }));
    request.subscribe(v => {
      this.feedback.success(`Added ${v.coumt} titles!`);
    });
  }

  private actionGoToArtist(item) {
    this.router.navigate(['/artist', item.artistid]);
  }

  private actionAddSong(item) {
    const request = this.service.getService()
      .pipe(mergeMap(service => {
        return this.bsapi.addSong(item.songid, service)
      }));
    request.subscribe(v => {
      this.feedback.success(`Added ${v.coumt} titles!`);
    });
  }

}
