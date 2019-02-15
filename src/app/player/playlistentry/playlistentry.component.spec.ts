import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistentryComponent } from './playlistentry.component';

describe('PlaylistentryComponent', () => {
  let component: PlaylistentryComponent;
  let fixture: ComponentFixture<PlaylistentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
