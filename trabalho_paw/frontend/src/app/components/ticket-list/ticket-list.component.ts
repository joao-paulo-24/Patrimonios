import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit {
  ticket: Ticket[] = [];
  filterText: string = '';

  constructor(
    private rest: TicketsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.rest.getTickets().subscribe((data: Ticket[]) => {
      if (!data) {
        console.log('Error receiving tickets');
      } else {
        let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
        let elementosEmComum: Ticket[] = [];

        for (let i = 0; i < obj.utilizador.bilhetes.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (obj.utilizador.bilhetes[i]._id == data[j]._id) {
              elementosEmComum.push(obj.utilizador.bilhetes[i]);
              break;
            }
          }
        }
        this.ticket = elementosEmComum;
      }
    });
  }
  getPontos() {
    let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return obj.utilizador.pontos;
  }
  addTickets() {
    this.router.navigate(['/ticket-add']);
  }

  view(id: string) {
    this.router.navigate(['/ticket-details/' + id]);
  }

  delete(id: string) {
    let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(obj.utilizador.bilhetes.length);

    for (let i = 0; i < obj.utilizador.bilhetes.length; i++) {
      if (obj.utilizador.bilhetes[i]._id == id) {
        let index = obj.utilizador.bilhetes.indexOf(obj.utilizador.bilhetes[i]);
        let elementsToRemove = 1;
        obj.utilizador.bilhetes.splice(index, elementsToRemove);
        console.log(obj.utilizador.bilhetes.length);
        localStorage.setItem('currentUser', JSON.stringify(obj));
      }
    }
    this.atualizarUtilizador();
    this.rest.deleteTicket(id).subscribe({
      next: () => {
        this.getTickets();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  atualizarUtilizador() {
    let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.rest.removeTicketUser(obj.utilizador).subscribe((data: any) => {
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
