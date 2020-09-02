import { Component, OnInit, Input } from '@angular/core';
import { PlayerStatus } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-player-status-minimal',
  templateUrl: './player-status-minimal.component.html',
  styleUrls: ['./player-status-minimal.component.scss'],
})
export class PlayerStatusMinimalComponent implements OnInit {
  @Input() status: PlayerStatus;
  constructor() {}

  ngOnInit() {}
}
