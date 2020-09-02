import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatusMinimalComponent } from './player-status-minimal.component';

describe('PlayerStatusMinimalComponent', () => {
  let component: PlayerStatusMinimalComponent;
  let fixture: ComponentFixture<PlayerStatusMinimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerStatusMinimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStatusMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
