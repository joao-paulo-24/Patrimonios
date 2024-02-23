import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/api/v1/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<AuthRestModelResponse> {
    return this.http.post<AuthRestModelResponse>(endpoint + "login", new loginModel(userName, password));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  register(userName: string, password: string, nome: string, email: string): Observable<AuthRestModelResponse> {
    return this.http.post<any>(endpoint + "register", new registerModel( userName, password, nome, email));
  }
}

export interface AuthRestModelResponse {

}

export class loginModel {
  constructor(public userName:string, public password:string){}
}

export class registerModel {
  constructor(public userName:string, public password:string, public nome:string, public email:string){}
}
