import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patrimonio } from '../../models/patrimonio';
import { PatrimoniosService } from 'src/app/services/patrimonios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patrimonio-list',
  templateUrl: './patrimonio-list.component.html',
  styleUrls: ['./patrimonio-list.component.css']
})

export class PatrimonioListComponent implements OnInit {
  
  patrimonio: Patrimonio[] = [];
  filterText: string = '';

  constructor(private rest:PatrimoniosService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.getPatrimonios();
  }

  getPatrimonios() {
    this.rest.getPatrimonios().subscribe((data: Patrimonio[]) => {
      console.log(data);
      this.patrimonio = data;
    });
  }

  view(id:string) {
    this.router.navigate(['/patrimonios-details/'+id]);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
