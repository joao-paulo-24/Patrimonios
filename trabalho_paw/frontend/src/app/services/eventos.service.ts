import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

const endpoint = 'http://localhost:3000/api/v1/events/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class EventosService {

  constructor(private http: HttpClient) { }

  getEvento(id:string): Observable<Evento> {
    return this.http.get<Evento>(endpoint+'show/'+id);
  }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(endpoint );
  }

}