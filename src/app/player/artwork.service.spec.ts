import { TestBed, inject } from '@angular/core/testing';

import { ArtworkService } from './artwork.service';

describe('ArtworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtworkService]
    });
  });

  it('should be created', inject([ArtworkService], (service: ArtworkService) => {
    expect(service).toBeTruthy();
  }));
});
