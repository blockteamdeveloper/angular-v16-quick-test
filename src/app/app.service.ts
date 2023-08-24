import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppService {
  private apiUrl = 'https://dinosaur-facts-api.shultzlab.com/dinosaurs';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  searchDynos(term: string): Observable<any[]> {
    // If they api would accept a term, I would pass the term in
    return this.http.get<any[]>(this.apiUrl);
  }
}
