
import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestUpdate } from '../user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})


export class UpdateComponent implements OnInit {
 
  _empresa: any;
  _filial: any;
  _mat: any;
  _nomecmp: any;
  _funcao: any;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  dtAtual: Date;
  dtCustom: string;
  hrAtual: string;
  ntemp: number;

  //Formulario
  registerForm: FormGroup;

  //Quando a pagina abrir tenho que olhar para url,
  //pegar o id
  //ir no no servico getUser de um unico usuario
  //para carregar os dados no formularios

  id: string;
  request: RequestUpdate;
  retCOVID: any;

  //Injetar dependencia userService de onde tem o metodo de listar um usuario
  //ActivateRoute para recuperar o id 
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog) {
    this.dtAtual = new Date()
    this.hrAtual = this.dtAtual.getHours() + ":" + ('0' +this.dtAtual.getMinutes()).slice(-2);
    this.dtCustom = this.dtAtual.toLocaleDateString('pt-BR');
    this.ntemp = 34.0;
  }

  ngOnInit(): void {
    //Focus
    function addFocusInput() {
      document.getElementById('text-focus').focus();
    }
    addFocusInput();
    
    //pegar o parametro que vem da rota
    this.id = this.route.snapshot.paramMap.get('id');

    // //Com o id passa par o get user
    this.userService.getUser(this.id).subscribe((result) => {
      this._empresa = result['empresa'];
      this._filial  = result['filial'];
      this._mat     = result['mat'];
      this._nomecmp = result['nomecmp'];
      this._funcao  = result['funcao'];
    });

    //Formulario
    this.createForm()
  }
  //Formulario
  createForm() {

    this.registerForm = this.fb.group({
      empresa: ['', Validators.required], //Os nomes dentro do form control names tem que ser iguais a estes.
      filial: ['', Validators.required],
      mat: ['', Validators.required],
      nomecmp: ['', Validators.required],
      funcao: ['', Validators.required],
       _data: ['', Validators.required],
      _time: ['', Validators.required],
      temp: ['', Validators.required]
    });
  }

  get empresa() { return this.registerForm.get('empresa'); }
  get filial() { return this.registerForm.get('filial'); }
  get mat() { return this.registerForm.get('mat'); }
  get nomecmp() { return this.registerForm.get('nomecmp'); }
  get funcao() { return this.registerForm.get('funcao'); }
  get _data() { return this.registerForm.get('_data'); }
  get _time() { return this.registerForm.get('_time'); }
  get temp() { return this.registerForm.get('temp'); }

  //Acao do click do botão salvar
  submitForm(customerData) {
    this.http.post('http://localhost:8084/rest/COVIDTEMP', customerData)
      .subscribe(
      retCOVID => {   
       if(retCOVID['sucesso']){
          console.log("teste");
          Swal.fire(
          // {position: 'top-end',
          {icon: 'success',
          title: retCOVID['msg'],
          showConfirmButton: false,
          timer: 1000});
        } else {
          Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: retCOVID['msg']
              // footer: '<a href>Why do I have this issue?</a>'
            })
        };

        // // console.log(retCOVID);
        // const ret = JSON.stringify(this.retCOVID);

        // if(ret['sucesso']){
        //   alert(ret['msg']);
        // }

      
      });
        
    this._router.navigate(["/users"]);
  }

  cancel() {
    this._router.navigate(["/users"]);
  }

}

