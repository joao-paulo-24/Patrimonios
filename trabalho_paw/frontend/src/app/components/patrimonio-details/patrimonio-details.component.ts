import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patrimonio } from '../../models/patrimonio';
import { PatrimoniosService } from 'src/app/services/patrimonios.service';

@Component({
  selector: 'app-patrimonio-details',
  templateUrl: './patrimonio-details.component.html',
  styleUrls: ['./patrimonio-details.component.css']
})
export class PatrimonioDetailsComponent implements OnInit{
  
  @Input() patrimonio:Patrimonio;
  
  constructor(private router: Router, private route: ActivatedRoute, private rest:PatrimoniosService ) { 
    this.patrimonio = new Patrimonio();
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getPatrimonio(idTemp).subscribe((data : Patrimonio)=>{
      this.patrimonio = data;
    })

  }
  
  navigateToPatrimonios(): void{
    this.router.navigate(['/patrimonios-list']);
  }

}
