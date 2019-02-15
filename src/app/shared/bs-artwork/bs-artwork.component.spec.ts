import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsArtworkComponent } from './bs-artwork.component';

describe('BsArtworkComponent', () => {
  let component: BsArtworkComponent;
  let fixture: ComponentFixture<BsArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
