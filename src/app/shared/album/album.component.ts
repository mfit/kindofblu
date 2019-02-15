import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  @Input() album;
  @Output() mainAction = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.mainAction.emit('');
  }

}
