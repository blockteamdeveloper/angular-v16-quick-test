import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Dynos } from './dynos.interfaces';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  providers: [AppService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dynos$!: Observable<Dynos[]>;
  private searchTerms$ = new Subject<string>();

  // For Prod I would call it DynoServicers
  constructor(private appService: AppService) {}

  search(term: string): void {
    console.log('term', term);
    this.searchTerms$.next(term);
  }

  ngOnInit(): void {
    // This example shows with Observables
    this.dynos$ = this.searchTerms$.pipe(
      // wait 300ms after each keystroke before considering the term
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.appService.searchDynos(term))
    );
  }
}
