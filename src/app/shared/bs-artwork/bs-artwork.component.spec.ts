import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsArtworkComponent } from './bs-artwork.component';
import { BsapiService } from 'src/app/core/bsapi.service';


let bsapi: Partial<BsapiService>;
bsapi = {};

describe('BsArtworkComponent', () => {
  let component: BsArtworkComponent;
  let fixture: ComponentFixture<BsArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BsapiService, useValue: bsapi }],
      declarations: [BsArtworkComponent]
    }).compileComponents();
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
