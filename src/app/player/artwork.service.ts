import { Injectable } from '@angular/core';
import { BsapiService } from '../shared/bsapi.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(bsapi: BsapiService) { }

  // http://192.168.0.19:11000/Artwork?service=Qobuz&songid=Qobuz%3A31274545
}
