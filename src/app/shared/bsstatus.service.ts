import { Injectable } from "@angular/core";
import { BsapiService } from "./bsapi.service";
import { BehaviorSubject, timer, Observable } from "rxjs";
import { mergeMap, map, share, distinctUntilChanged } from "rxjs/operators";
import * as he from "he";
import { PlayerStatus } from "./api/interfaces";

@Injectable({
  providedIn: "root"
})
export class BsstatusService {
  // Interval for status polling
  statusInterval = 1000;

  // Status once every interval (1 sec)
  status$ = new BehaviorSubject<PlayerStatus>(null);

  // Emits only when playstate or song number changes
  statusTrackChange$: Observable<any>;

  constructor(private api: BsapiService) {
    const pollingSource = timer(0, this.statusInterval);

    const statusUpdates = pollingSource.pipe(
      mergeMap(_ => this.api.getStatus()),
      map(status => this._mapStatus(status)),
      share()
    );

    statusUpdates.subscribe(status => {
      this.status$.next(status);
    });

    this.statusTrackChange$ = statusUpdates.pipe(
      map(status => [status.song, status.state].join("-")),
      distinctUntilChanged()
    );
  }

  _mapStatus(status) {
    const mappedStatus = Object.assign(status, {
      serviceIconUrl: this._mapImageUrl(status.serviceIcon),
      name: status.name ? he.decode(status.name) : status.title1,
      artist: status.artist ? he.decode(status.artist) : status.title2,
      album: status.album ? he.decode(status.album) : status.title3
    });
    return mappedStatus;
  }

  _mapImageUrl(url) {
    if (!url) {
      return "";
    }
    return url.indexOf("http") === 0
      ? he.decode(url)
      : this.api.baseurl + he.decode(url);
  }

  getStatus() {
    return this.status$.getValue();
  }
}
