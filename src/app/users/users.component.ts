import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { ResponseUsers } from './user.model';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExporterService } from '../services/exporter.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  retDados :any;
  //Do tipo modelo.ts, e pode ser enxergada no html 
  responseUsers: ResponseUsers;

  //Chama o service 
  constructor(private userService: UserService,
              private excellService: ExporterService) { }
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Executado toda vez que o componente é inicializado
  //Vai chamar o service.ts
  ngOnInit(): void {
        //Para pegar o conteudo eu tenho que sobrescrevlo com "subscribe"
      //quando retornar o objeto ResponseUsers eu faço algo 
      //o retorno atribuo para variavel responseUsers
       this.userService.getUsers()
      .subscribe((result) => {
        this.retDados = new MatTableDataSource(result.data);
        this.retDados.sort = this.sort;
        this.retDados.paginator = this.paginator;
      }
    )
  }

  //Exportar Excel
  exportAsXLSX(): void{
    this.excellService.exportToExcel(this.retDados.data,'Minha Exportacao');
  }

  //Exportar Excel - Filtered
  exportAsXLSXFiltered(): void{
    this.excellService.exportToExcel(this.retDados.filteredData,'Minha Exportacao');
  }

  displayedColumns: string[] = ['empresa', 'filial', 'mat','nomecmp','funcao','customColumn'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.retDados.filter = filterValue.trim().toLowerCase();

    if (this.retDados.paginator) {
      this.retDados.paginator.firstPage();
    }
  }

  
}
