import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseUsers, ResponseCreate, RequestCreate, ResponseUser, RequestUpdate, ResponseUpdate } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deleteUsereUser(id: string) {
    throw new Error("Method not implemented.");
  }
  name: string;
  private url = "http://localhost:8084/rest/COVIDTEMP"; 

  //Injeta dependencia hTTP
  constructor(private http: HttpClient) { }

  //Lista varios usuarios
  //Retorno do metodo Get com Observable (fica observando, esperando dar o retorno para executar algo)
  getUsers(): Observable<ResponseUsers>{ 
    //Retorno, para quem chamar este metodo
    return this.http.get<ResponseUsers>(this.url);
  }

  //Lista um usuario
  //Retorno do metodo Get com Observable (fica observando, esperando dar o retorno para executar algo)
  getUser(id: string): Observable<ResponseUser>{ 
    //Passando Id para Url : https://reqres.in/api/users/id
    const _url = `${this.url}/${id}`
    //Retorno, para quem chamar este metodo
    return this.http.get<ResponseUser>(_url);
  }

  //Passo o objeto RequestCreate (definido no user.model.ts) e retorna e fica Observalbe(Retorna o objeto ResponseCreate
  //cirado no user.model.ts)
  createUser(request: RequestCreate): Observable<ResponseCreate>{
    //Retorna responseCreate passando url e o corpo que é request informado como parametor de entrada
    return this.http.post<ResponseCreate>(this.url,request);
  }

  updateUser(id: string, request: RequestUpdate): Observable<ResponseUpdate> {
    //Passando Id para Url : https://reqres.in/api/users/id
    const _url = `${this.url}/${id}`
    return this.http.put<ResponseUpdate>(_url,request);

  }

  deleteUser(id: string): Observable<any> {
    //Passando Id para Url : https://reqres.in/api/users/id
    const _url = `${this.url}/${id}`
    return this.http.delete<any>(_url);

  }

}
