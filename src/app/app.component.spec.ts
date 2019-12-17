import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
