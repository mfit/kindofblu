import { Component, OnInit, Input } from '@angular/core';
import { PlayerStatus } from 'src/app/shared/api/interfaces';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss']
})
export class PlayerStatusComponent implements OnInit {
  @Input() status: PlayerStatus;
  constructor() { }

  ngOnInit() {
  }
}
