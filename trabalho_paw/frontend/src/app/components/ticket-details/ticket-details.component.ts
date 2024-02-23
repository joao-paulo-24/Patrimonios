import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit{
  
  @Input() ticket:Ticket;
  
  constructor(private router: Router, private route: ActivatedRoute, private rest:TicketsService ) { 
    this.ticket = new Ticket();
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getTicket(idTemp).subscribe((data : Ticket)=>{
      this.ticket = data;
    })

  }
  
  navigateToTickets(): void{
    this.router.navigate(['/ticket-list']);
  }

}
