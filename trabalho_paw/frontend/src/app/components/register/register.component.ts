import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userName: string;
  password: string;
  nome: string;
  email: string;

  constructor(private router: Router, private authService: AuthService) {
    this.userName = '';
    this.password = '';
    this.nome = '';
    this.email = '';
  }

  ngOnInit(): void {}

  register(): void {
    this.authService
      .register(this.userName, this.password, this.nome, this.email)
      .subscribe({
        next: (user: any) => {
          if (user) {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err), alert('Erro ao registar');
        },
      });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
