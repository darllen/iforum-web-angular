import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../response/login-response.type';
import { tap } from 'rxjs';
// AQUI VAI FICAR A LÓGICA DE PEGAR O QUE VIER DO FRONT E MANDAR PARA O BACK
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>("/login", { email, password }).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("email", value.email)
      })
    )
  }
}
