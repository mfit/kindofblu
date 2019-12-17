import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerControlsComponent } from './player-controls.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('PlayerControlsComponent', () => {
  let component: PlayerControlsComponent;
  let fixture: ComponentFixture<PlayerControlsComponent>;
  let initialState = { player: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatSliderModule, FormsModule],
      providers: [
        provideMockStore({ initialState })
        // other providers
      ],
      declarations: [PlayerControlsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
