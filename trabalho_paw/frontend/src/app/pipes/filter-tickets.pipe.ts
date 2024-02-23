import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../models/ticket';

@Pipe({
  name: 'filterTickets'
})
export class FilterTicketsPipe implements PipeTransform {

  transform(tickets: Ticket[],  filterText:string='') {
    if (tickets.length === 0 || ( filterText==='')){
      return tickets;
    } else {

      return tickets.filter((tickets) =>
      {
        return (tickets.clientNIF.toString() === filterText.toString() || tickets.eventoNome.toLowerCase() === filterText.toLowerCase());
      })
    }
  }

}
