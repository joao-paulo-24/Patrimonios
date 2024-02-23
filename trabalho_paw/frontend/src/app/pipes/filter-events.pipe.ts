import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from '../models/evento';

@Pipe({
  name: 'filterEvents',
})
export class FilterEventsPipe implements PipeTransform {
  transform(events: Evento[], filterText: string = '') {
    if (events.length === 0 || filterText === '') {
      return events;
    } else {
      return events.filter((events) => {
        return events.nome.toLowerCase() === filterText.toLowerCase();
      });
    }
  }
}
