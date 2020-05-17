import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { EMPTY, fromEvent, Observable, OperatorFunction } from 'rxjs';
import { debounceTime, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { Page } from '@route-optimizer/core/models/Page';

@Component({
  selector: 'app-autocomplete-infinite-scroll',
  templateUrl: './autocomplete-infinite-scroll.component.html'
})
export class AutocompleteInfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() displayProperties: string[];
  @Input() control: FormControl;
  @Input() url: string;

  @ViewChild('elementsAutocomplete', { static: false }) elementsAutocompleteRef: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger, { static: false }) autocompleteTrigger: MatAutocompleteTrigger;
  pageEmpty = false;
  pageLoading = false;
  nextPage: string;
  results: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.pageLoading = true;
    const url = this.url + '?format=json&page_size=10';
    this.fetchElements(url).subscribe(results => {
      this.results = results;
    });
  }

  ngOnDestroy() {}

  private getResultsFromPage(): OperatorFunction<Page<any>, any[]> {
    return map((page: Page<any>) => {
      this.nextPage = page.next;
      this.pageEmpty = !!!page.next;
      return page.results;
    });
  }

  private updateResults(): OperatorFunction<Page<any>, any[]> {
    return source =>
      source.pipe(
        this.getResultsFromPage(),
        finalize(() => (this.pageLoading = false))
      );
  }

  private fetchElements(url: string): Observable<any[]> {
    const elements = this.http.get(url).pipe(this.updateResults());

    if (this.autocompleteTrigger && this.autocompleteTrigger.panelClosingActions) {
      return elements.pipe(takeUntil(this.autocompleteTrigger.panelClosingActions));
    }

    return elements.pipe(untilComponentDestroyed(this));
  }

  private handleControlValueChange(): Observable<any[]> {
    return this.control.valueChanges.pipe(
      debounceTime(200),
      map(value => {
        this.pageLoading = true;
        if (value instanceof Object) {
          return this.displayElement(value);
        }
        return value;
      }),
      switchMap(value => {
        const url = this.url + '?format=json&page_size=10&search=' + value;
        return this.fetchElements(url);
      })
    );
  }

  private handleScrollEvent(): Observable<any[]> {
    return fromEvent(this.elementsAutocompleteRef.panel.nativeElement, 'scroll').pipe(
      map(x => this.elementsAutocompleteRef.panel.nativeElement.scrollTop),
      switchMap(x => {
        if (this.pageEmpty || this.pageLoading) {
          return EMPTY;
        }
        const scrollTop = this.elementsAutocompleteRef.panel.nativeElement.scrollTop;
        const scrollHeight = this.elementsAutocompleteRef.panel.nativeElement.scrollHeight;
        const elementHeight = this.elementsAutocompleteRef.panel.nativeElement.clientHeight;
        const atBottom = scrollHeight === scrollTop + elementHeight;

        // Scrolled to down
        if (atBottom) {
          this.pageLoading = true;
          return this.fetchElements(this.nextPage);
        }
        return EMPTY;
      })
    );
  }

  displayElement(element: any): string | undefined {
    if (!element) {
      return undefined;
    }

    // TODO: Consider using advanced seperator logic
    const displayArray = this.displayProperties.map(prop => element[prop]);

    return displayArray.join(' ');
  }

  autocompleteScroll(): void {
    setTimeout(() => {
      if (this.elementsAutocompleteRef && this.autocompleteTrigger && this.elementsAutocompleteRef.panel) {
        // Subscriptions last to close the autocomplete popup
        this.handleControlValueChange().subscribe(results => {
          this.results = results;
        });

        this.handleScrollEvent().subscribe(results => {
          this.results = this.results.concat(results);
        });
      }
    });
  }
}
