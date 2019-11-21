import { Component, OnInit } from '@angular/core';
import { BsapiService } from 'src/app/core/bsapi.service';
import { map } from 'rxjs/operators';
import { ServiceSourceService } from '../service-source.service';
import { combineLatest } from 'rxjs';
import { ServiceDef } from 'src/app/shared/api/interfaces/service-def';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  selector: 'app-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.css']
})
export class ServicesViewComponent implements OnInit {
  services$;
  constructor(private api: BsapiService,
    private serviceSource: ServiceSourceService,
    private feedback: FeedbackService) { }
  ngOnInit() {
    this.services$ = combineLatest(this.api.getServices(),
      this.serviceSource.getService())
      .pipe(
        map(([result, activeService]) => {
          return result.items.map(item => Object.assign(item, {
            image: this.api.hostPrefix(item.image),
            serviceKey: this._convertBrowseKey(item.browseKey),
            selected: activeService === this._convertBrowseKey(item.browseKey)
          }));
        }));
  }

  select(service: ServiceDef) {
    const serviceKey = this._convertBrowseKey(service.browseKey);
    if (serviceKey) {
      this.serviceSource.setService(serviceKey)
        .subscribe(_ => this.feedback.success(`Service changed to ${serviceKey}`));
    }
  }

  _convertBrowseKey(key) {
    return (key || '').replace(':', '');
  }
}
