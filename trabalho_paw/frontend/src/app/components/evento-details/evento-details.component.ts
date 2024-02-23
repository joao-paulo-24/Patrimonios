import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-evento-details',
  templateUrl: './evento-details.component.html',
  styleUrls: ['./evento-details.component.css'],
})
export class EventoDetailsComponent implements OnInit {
  @Input() evento: Evento;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: EventosService
  ) {
    this.evento = new Evento();
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getEvento(idTemp).subscribe((data: Evento) => {
      this.evento = data;
    });
  }

  navigateToEvento(): void {
    this.router.navigate(['/event-list']);
  }
}
