import { TestBed, inject } from '@angular/core/testing';

import { ServiceSourceService } from './service-source.service';

describe('ServiceSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceSourceService]
    });
  });

  it('should be created', inject([ServiceSourceService], (service: ServiceSourceService) => {
    expect(service).toBeTruthy();
  }));
});
