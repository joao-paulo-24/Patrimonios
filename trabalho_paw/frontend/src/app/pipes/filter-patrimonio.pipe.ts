import { Pipe, PipeTransform } from '@angular/core';
import { Patrimonio } from '../models/patrimonio';

@Pipe({
  name: 'filterPatrimonio'
})
export class FilterPatrimonioPipe implements PipeTransform {

  transform(patrimonios: Patrimonio[],  filterText:string='') {
    if (patrimonios.length === 0 || ( filterText==='')){
      return patrimonios;
    } else {

      return patrimonios.filter((patrimonios) =>
      {
        return (patrimonios.nome.toLowerCase() === filterText.toLowerCase());
      })
    }
  }

}
