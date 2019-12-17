import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsongComponent } from './albumsong.component';

xdescribe('AlbumsongComponent', () => {
  let component: AlbumsongComponent;
  let fixture: ComponentFixture<AlbumsongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
