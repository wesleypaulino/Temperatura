import { Component, OnInit } from '@angular/core';
import { RequestCreate, ResponseCreate } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  //Precisa de um objeto para representar os dados inseridos na tela
  //a variavel request fica disponviel para utilizar no html com [(ngModel)] = "request.name"
  request: RequestCreate = {
    name: ' ',
    job:  ' '
  }

  //Variavel para demostrar retorno da gravaçaõ
  response: ResponseCreate

  //Chamar o service, injetando a dependencia para sua utilizacao
  constructor(private userSerivce: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  //Cria metodo save do botao
  save() {
    //Chama o metodo criado no user.service.ts passando como parametro o request
    this.userSerivce.createUser(this.request).subscribe(res => {
     //variavel para conseguir recuperar no html
      this.response = res;
      alert('Registro criado com sucesso');
      this._router.navigate(["/users"]);
    });
  }

  //Voltar pagina
  cancel() {
    this._router.navigate(["/users"])
  }
  
}
