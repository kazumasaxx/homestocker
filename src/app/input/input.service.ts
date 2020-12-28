import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { m_store, m_item } from './input';
import { stock } from '../stock/stock';
@Injectable({
  providedIn: 'root'
})
export class InputService {
  stores: m_store[];
  private url = 'http://192.168.1.90:8001/api';
  constructor(
    private http: HttpClient
  ) { }
  getstores(): Observable<m_store[]> {
    return this.http.get<m_store[]>(`${this.url}/stores`)
      .pipe(
        catchError(this.handleError('getstores', []))
      );
  }

  getmasteritems(): Observable<m_item[]> {
    return this.http.get<m_item[]>(`${this.url}/mitem`)
      .pipe(
        catchError(this.handleError('getmasteritems', []))
      );
  }
  getmasteritem(id: number): Observable<m_item[]> {
    console.log(id);
    return this.http.get<m_item[]>(`${this.url}/getmasteritem/${id}`)
      .pipe(
        catchError(this.handleError<m_item[]>(`getmasteritem id=${id}`))
      );
  }
  setmasteritem(item: m_item): Observable<m_item> {
    const id = item.id;
    return this.http.post<m_item>(`${this.url}/setmasteritem`, item)
      .pipe(
        catchError(this.handleError<m_item>(`setmasteritem id=${id}`))
      );
  }
  setstock(stock: stock): Observable<stock> {
    const id = stock.id;
    console.log(stock);
    return this.http.post<stock>(`${this.url}/stock`, stock)
      .pipe(
        catchError(this.handleError<stock>(`setstock id=${id}`))
      );
  }
  // setstock(stock: stock): Observable<stock> {
  //   const id = stock.id;
  //   return this.http.post<stock>(`${this.url}/stock/${id}`, stock)
  //     .pipe(
  //       catchError(this.handleError<stock>(`setstock id=${id}`))
  //     );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
