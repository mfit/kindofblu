import { Injectable } from '@angular/core';
import { PlayerSettings } from '../shared/player-settings';
import { BehaviorSubject } from 'rxjs';

// TODO: initialise settings from (and save to) local storage
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  state$ = new BehaviorSubject<PlayerSettings>({
    protocol: 'http',
    ip: '192.168.0.102',
    port: 11000
  });
  constructor() {}

  getSettings$() {
    return this.state$;
  }

  setSettings(settings: PlayerSettings) {
    this.state$.next(settings);
  }
}
