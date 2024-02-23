import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from 'src/app/models/evento';
import { User } from '../../models/user';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css'],
})
export class TicketAddComponent implements OnInit {
  @Input() ticket: Ticket;
  evento: Evento[] = [];
  pontosDescontados: boolean = false;
  botaoDesabilitado: boolean = false;
  semPontos: boolean = false;
  botaoComprarPressionado: boolean = false;

  constructor(
    private router: Router,
    private rest: TicketsService,
    private restEvents: EventosService
  ) {
    this.ticket = new Ticket();
  }

  ngOnInit(): void {
    this.getEventos();
  }

  add(): void {
    if (
      this.ticket.quantidade > 0 &&
      this.ticket.quantidade <= 100 &&
      this.ticket.eventoNome != ''
    ) {
      this.ticket.pontos = this.ticket.quantidade * 10;
      if (
        this.ticket.clientNIF == null ||
        (this.ticket.clientNIF as number) < 100000000 ||
        (this.ticket.clientNIF as number) > 999999999
      ) {
        this.ticket.clientNIF = 999999999;
      }
      let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.rest.addTicket(this.ticket).subscribe((data: Ticket) => {
        obj.utilizador.bilhetes.push(data);
        obj.utilizador.pontos += this.ticket.pontos;
        localStorage.setItem('currentUser', JSON.stringify(obj));
        this.atualizarUtilizador();
        this.router.navigate(['/ticket-list/']);
      });
    } else {
      alert('O formulário foi incorretamente preenchido');
      this.router.navigate(['/ticket-add/']);
    }
  }
  atualizarUtilizador() {
    let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.rest.addTicketUser(obj.utilizador).subscribe((data: any) => {});
  }
  descontoAplicado() {
    let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (obj.utilizador.pontos >= 1000) {
      this.pontosDescontados = true;
      this.botaoDesabilitado = true;
    } else {
      this.semPontos = true;
    }
  }
  descontoPontos() {
    let obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(this.pontosDescontados);
    if (this.pontosDescontados) {
      obj.utilizador.pontos -= 1000;
      localStorage.setItem('currentUser', JSON.stringify(obj));
    }
  }
  getEventos() {
    this.restEvents.getEventos().subscribe((data: Evento[]) => {
      this.evento = data;
    });
  }
  navigateToTickets(): void {
    this.router.navigate(['/ticket-list/']);
  }
}
