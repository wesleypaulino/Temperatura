import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  id: string;
  user: User; //Obtem do  user.modelo.ts

  constructor(private userService: UserService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    //pegar o parametro que vem da rota
    this.id = this.route.snapshot.paramMap.get('id');
    //Com o id passa par o get user
    this.userService.getUser(this.id).subscribe(res => {
    this.user = res.data;
    });
  }

  delete() {
    this.userService.deleteUser(this.id).subscribe(res => {
      alert('Removido com sucesso');
      this._router.navigate(["/users"]);
    })

  }

  cancel() {
    this._router.navigate(['/users'])
  }
}
