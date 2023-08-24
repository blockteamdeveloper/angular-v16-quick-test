import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Dynos } from './dynos.interfaces';

@Injectable({ providedIn: 'root' })
export class AppService {
  // found a dyno api
  private apiUrl = 'https://dinosaur-facts-api.shultzlab.com/dinosaurs';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  searchDynos(term: string): Observable<any[]> {
    //Using the term and some filter with lowercase to make it case insensitive
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: Dynos[]) => {
        return data.filter((dyno: Dynos) => {
          return dyno.Name.toLowerCase().includes(term.toLowerCase());
        });
      })
    );
  }
}
