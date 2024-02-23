import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patrimonio } from '../models/patrimonio';

const endpoint = 'http://localhost:3000/api/v1/patrimonios/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class PatrimoniosService {

  constructor(private http: HttpClient) { }

  getPatrimonio(id:string): Observable<Patrimonio> {
    return this.http.get<Patrimonio>(endpoint+'show/'+id);
  }

  getPatrimonios(): Observable<Patrimonio[]> {
    return this.http.get<Patrimonio[]>(endpoint );
  }
  
}
