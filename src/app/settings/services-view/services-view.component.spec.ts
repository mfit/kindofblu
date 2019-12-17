import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesViewComponent } from './services-view.component';

xdescribe('ServicesViewComponent', () => {
  let component: ServicesViewComponent;
  let fixture: ComponentFixture<ServicesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
