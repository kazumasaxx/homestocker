import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class stockService {
  stocks: stock[];
  private url = 'http://192.168.1.90:8001/api';

  constructor(
    private http: HttpClient
  ) { }

  getstocks(): Observable<stock[]> {
    return this.http.get<stock[]>(`${this.url}/stocks`)
      .pipe(
        catchError(this.handleError('getstocks', []))
      );
  }

  getstock(id: number): Observable<stock> {
    return this.http.get<stock>(`${this.url}/stocks/${id}`)
      .pipe(
        catchError(this.handleError<stock>(`getstock id=${id}`))
      );
  }

  setstock(stock: stock): Observable<stock> {
    const id = stock.id;
    return this.http.post<stock>(`${this.url}/stocks/${id}`, stock)
      .pipe(
        catchError(this.handleError<stock>(`setstock id=${id}`))
      );
  }
  changecount(stock: stock): Observable<stock> {
    const id = stock.id;
    return this.http.post<stock>(`${this.url}/changecountdown`, stock)
      .pipe(
        catchError(this.handleError<stock>(`changecountid=${id}`))
      );
  }
  setstockincr(stock: stock): Observable<stock> {
    console.log(stock);
    let target = this.http.post<stock>(`${this.url}/changecountnew`, stock)
      .pipe(
        catchError(this.handleError<stock>(`changecountnew id=${stock.item}`))
      );
    //if (target.toPromise.length > 0) {
    return target;
    //ここでは、idのみ
    //target[0].count += 1;
    return this.http.post<stock>(`${this.url}/changecountup`, target)
      .pipe(
        catchError(this.handleError<stock>(`changecount id=${stock.item}`))
      );
    //}
  }
  changecountup(stock: stock): Observable<stock> {
    return this.http.post<stock>(`${this.url}/changecountup`, stock)
      .pipe(
        catchError(this.handleError<stock>(`changecount id=${stock.item}`))
      );
    //}
  }
  setstockless(stock: stock): Observable<stock> {
    console.log(stock);
    let target = this.http.post<stock>(`${this.url}/changecountold`, stock)
      .pipe(
        catchError(this.handleError<stock>(`changecountnew id=${stock.item}`))
      );
    return target;
    //ここでは、idのみ
  }
  changecountdown(stock: stock): Observable<stock> {
    return this.http.post<stock>(`${this.url}/changecountdown`, stock)
      .pipe(
        catchError(this.handleError<stock>(`changecount id=${stock.item}`))
      );
    //}
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
