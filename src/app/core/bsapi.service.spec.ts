import { TestBed, inject } from '@angular/core/testing';

import { BsapiService } from './bsapi.service';

describe('BsapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BsapiService]
    });
  });

  it('should be created', inject([BsapiService], (service: BsapiService) => {
    expect(service).toBeTruthy();
  }));
});
