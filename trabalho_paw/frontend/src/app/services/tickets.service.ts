import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

const endpoint = 'http://localhost:3000/api/v1/tickets/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private http: HttpClient) {}

  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(endpoint + 'show/' + id);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    console.log(ticket);
    return this.http.post<Ticket>(
      endpoint + 'purchase',
      JSON.stringify(ticket),
      httpOptions
    );
  }
  addTicketUser(user: any): Observable<any> {
    return this.http.post<any>(
      endpoint + 'attUserTickets',
      JSON.stringify(user),
      httpOptions
    );
  }
  removeTicketUser(user: any): Observable<any> {
    return this.http.post<any>(
      endpoint + 'attUserTicketsRemove',
      JSON.stringify(user),
      httpOptions
    );
  }
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(endpoint);
  }

  deleteTicket(id: string): Observable<Ticket> {
    return this.http.delete<Ticket>(
      endpoint + 'delete/' + `${id}`,
      httpOptions
    );
  }
}
