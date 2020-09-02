import { Injectable } from '@angular/core';
import { PlayerSettings } from '../shared/player-settings';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  state$ = new BehaviorSubject<PlayerSettings>({
    protocol: 'http',
    ip: '192.168.0.102',
    port: 11000
  });

  constructor() {
    const stored = this._getStored();
    if (stored) {
      this.setSettings(stored);
    }
  }

  getSettings$() {
    return this.state$;
  }

  setSettings(settings: PlayerSettings) {
    this.state$.next(settings);
    this._setStored(settings);
  }

  private _getStored(): PlayerSettings {
    const storage = window.localStorage;
    const _stored = storage.getItem('settings');
    return _stored ? {...JSON.parse(_stored)} as PlayerSettings : null;
  }

  private _setStored(settings: PlayerSettings) {
    const storage = window.localStorage;
    storage.setItem('settings', JSON.stringify(this.state$.getValue()));
  }
}
