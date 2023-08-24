import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, withLatestFrom } from 'rxjs/operators';
import { Dynos } from '../interfaces/dynos.interfaces';

@Injectable({ providedIn: 'root' })
export class DinosaurService {
  private apiUrl = 'https://dinosaur-facts-api.shultzlab.com/dinosaurs';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  search(term: string): Observable<any[]> {
    // If they api would accept a term, I would pass the term in
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) => {
        // moved it here as when have proper API with search term I would removes this redundant code
        return data.filter((dyno: Dynos) => {
          return dyno.Name.toLowerCase().includes(term.toLowerCase());
        });
      })
    );
  }
}
