import { BsArtworkDirective } from './bs-artwork.directive';
import { BsapiService } from '../core/bsapi.service';

class MockedBsApiService {
  getAlbumArt(id, service) {}
  getArtistArt(id, service) {}
}

xdescribe('BsArtworkDirective', () => {
  it('should create an instance', () => {
    const directive = new BsArtworkDirective(<BsapiService> new MockedBsApiService());
    expect(directive).toBeTruthy();
  });
});
