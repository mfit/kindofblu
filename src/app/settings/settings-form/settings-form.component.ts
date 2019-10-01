import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PlayerSettings } from 'src/app/shared/player-settings';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent implements OnInit {
  _playerSettings: PlayerSettings;
  @Input() set value(value: PlayerSettings) {
    this._playerSettings = value;
    this.form.patchValue(value);
  }
  get value() {
    return this._playerSettings;
  }
  @Output() save = new EventEmitter<PlayerSettings>();
  form = this.fb.group({
    ip: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit() {
    if(this.form.valid) {
      const updated = {...this._playerSettings, ...this.form.value};
        this.save.next(updated);
    }
  }
}
