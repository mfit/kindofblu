import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { PlayerSettings } from 'src/app/shared/player-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  value$;
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.value$ = this.settingsService.getSettings$();
  }

  updateSettings(settings: PlayerSettings) {
    this.settingsService.setSettings(settings);
  }
}
