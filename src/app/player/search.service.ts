import { Injectable } from '@angular/core';
import { BsapiService } from '../shared/bsapi.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../shared/api/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  recentSearches = [];
  constructor(private bsapi: BsapiService) {
  }

  query(queryString, serviceName): Observable<SearchResult> {
    this.recentSearches.push(queryString);
    return this.bsapi.search(queryString, serviceName);
  }

  getRecentSearchTerm() {
    return this.recentSearches[this.recentSearches.length-1];
  }
}
