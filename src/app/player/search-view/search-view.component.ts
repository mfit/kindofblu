import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, mergeMap, startWith } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { ServiceSourceService } from '../service-source.service';
import { combineLatest } from 'rxjs';
import { SearchResult } from 'src/app/shared/api/interfaces';

@Component({
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  searchInput = new FormControl();
  constructor(private searchService: SearchService,
    private sourceService: ServiceSourceService) { }

  result: SearchResult;

  ngOnInit() {
    let query$ = this.searchInput.valueChanges
      .pipe(
        debounceTime(500)
      );
    const recent = this.searchService.getRecentSearchTerm();
    if(recent) {
      this.searchInput.setValue(recent);
      query$ = query$.pipe(startWith(recent));
    }

    combineLatest(query$, this.sourceService.getService())
      .pipe(
        mergeMap(([queryString, serviceName]) => {
          return this.searchService.query(queryString, serviceName);
        }))
      .subscribe(result => this.result = result);
  }

}
