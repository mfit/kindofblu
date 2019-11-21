import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, mergeMap, startWith, takeUntil } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { ServiceSourceService } from '../../settings/service-source.service';
import { combineLatest, Subject } from 'rxjs';
import { SearchResult } from 'src/app/shared/api/interfaces';
import { BsapiService } from 'src/app/core/bsapi.service';

@Component({
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  searchInput = new FormControl();
  result: SearchResult;
  status$;
  destroy$ = new Subject();

  constructor(private searchService: SearchService,
    private sourceService: ServiceSourceService,
    private bsapi: BsapiService) { }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngOnInit() {
    let query$ = this.searchInput.valueChanges
      .pipe(
        debounceTime(500)
      );
    const recent = this.searchService.getRecentSearchTerm();
    if (recent) {
      this.searchInput.setValue(recent);
      query$ = query$.pipe(startWith(recent));
    }

    combineLatest(query$, this.sourceService.getService())
      .pipe(
        mergeMap(([queryString, serviceName]) => {
          return this.searchService.query(queryString, serviceName);
        }))
      .subscribe(result => this.result = result);

    this.status$ = this.bsapi.getStatus().pipe(takeUntil(this.destroy$));
  }
}
