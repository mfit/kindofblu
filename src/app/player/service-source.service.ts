import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceSourceService {
  service = 'Qobuz';
  constructor() {

  }

  getService(): Observable<string> {
    return of(this.service);
  }

  setService(service): Observable<any> {
    this.service = service;
    return of(true);
  }

}
