import { TestBed, inject } from '@angular/core/testing';

import { BsstatusService } from './bsstatus.service';

xdescribe('BsstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BsstatusService]
    });
  });

  it('should be created', inject([BsstatusService], (service: BsstatusService) => {
    expect(service).toBeTruthy();
  }));
});
