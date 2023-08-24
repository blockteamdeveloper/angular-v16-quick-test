import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Dynos } from './dynos.interfaces';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  providers: [AppService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // added this as simpliest way to stop them clicking search before we get data back
  // where is ngrx when i need it.
  loading: boolean;
  dynos$!: Observable<Dynos[]>;
  searchTerm: string;

  // For Prod I would call it DynoServicers
  constructor(private appService: AppService) {
    // lets be strick and have things intialiazed in contructor
    this.searchTerm = '';
    this.loading = false;
  }
  onSearch(): void {
    this.loading = true;
    this.dynos$ = this.appService.searchDynos(this.searchTerm);
    this.loading = false;
  }
}
