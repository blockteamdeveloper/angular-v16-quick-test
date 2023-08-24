import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject, distinctUntilChanged, switchMap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { DinosaurService } from '../../service/dinosaur.service';
import { Dynos } from '../../interfaces/dynos.interfaces';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  providers: [DinosaurService],
  selector: 'app-dinosaur',
  templateUrl: './dinosaur.component.html',
  // styleUrls: ['./app.component.css'],
})
export class DinosaurComponent {
  // File order normally
  // @inputs()
  // @outputs()
  // vars
  // getters
  // constructor(){}
  // ng Methods
  // methods
  // private methods
  pagetitle = 'Dinosaur directory';
  dynos$!: Observable<Dynos[]>;
  private searchTerms$ = new Subject<string>();

  // For Prod I would call it DinosaurService
  constructor(private dinosaurService: DinosaurService) {}

  ngOnInit(): void {
    // This example shows with Observables
    this.dynos$ = this.searchTerms$.pipe(
      // wait 300ms after each keystroke before considering the term
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.dinosaurService.search(term))
    );
  }

  search(term: string): void {
    this.searchTerms$.next(term);
  }
}
