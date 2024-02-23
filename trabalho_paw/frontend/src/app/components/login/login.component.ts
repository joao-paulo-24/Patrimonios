import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  
  constructor(private router: Router, private authService: AuthService) {
    this.userName = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  login(): void{
    this.authService.login(this.userName, this.password).subscribe({next: (user: any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/event-list']);
      }
    }, error: err => {console.log(err), alert("Credenciais inválidas");}});
  }

  register(){
    this.router.navigate(['/register']);
  }

}
