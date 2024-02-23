import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventosService } from 'src/app/services/eventos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})

export class EventoListComponent implements OnInit {
  
  evento: Evento[] = [];
  filterText: string = '';

  constructor(private rest:EventosService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos() {
    this.rest.getEventos().subscribe((data: Evento[]) => {
      console.log(data);
      this.evento = data;
    });
  }

  view(id:string) {
    this.router.navigate(['/event-details/'+id]);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}