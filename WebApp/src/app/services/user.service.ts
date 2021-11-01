import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='http://localhost:3000'

  constructor(private http: HttpClient) { }

  registrarUsuario(user: any){
    return this.http.post(`${this.url}`, user);
  }

  login(user: any){
    return this.http.post(`${this.url}`, user);
  }
  
}
