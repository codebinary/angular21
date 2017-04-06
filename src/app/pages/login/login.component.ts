import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

//Para las rutas
import { Router, ActivatedRoute } from '@angular/router';

//Importamos los servicios
import { LoginService } from './services/index';
import { User } from '../../model/index';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  providers: [ LoginService ]
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

 
  //private user:User;
  private values;
  public token;
  public identity;

  public returnUrl: string;

  constructor(fb:FormBuilder,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public ngOnInit(){
        //reset login status 
        this.loginService.logout();

        //get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/tables/smarttables';
        //Construimos el json para enviarlo con el hash
        this.values = {
          "email": "",
          "password": "",
          "gethash": "false"
        };
  }

  public onSubmit(values:Object):void {

    this.submitted = true;
    if (this.form.valid) {


       this.values = values;
       //console.log(this.values);

       this.loginService.login(this.values).subscribe(
             response => {
               let identity = response;
               this.identity = identity;
               //console.log(identity);

               if(this.identity.length <= 1){
                 console.log("error length el servidor");
               }else{
                 //Si no existe el status entonces continuamos 
                 if(!this.identity.status){
                     localStorage.setItem('identity', JSON.stringify(identity));

                     //GET TOKEN
                    this.values.gethash = "true";
                    this.loginService.login(this.values).subscribe(
                        response => {
                          let token = response;
                          this.token = token;
                          //console.log(token);
                          if(this.token.length <= 0){
                              alert("Error en el servidor");
                          }else{
                              if(!this.token.status){
                                  localStorage.setItem('token', token);
                                  //console.log(token);

                                  //Redireccionamos
                                  this.router.navigate([this.returnUrl]);
                              }
                          }
                        },
                        error => {
                            console.log(error);
                        }
                      )

                 }  
               }
             }
           );
      // your code goes here
      // console.log(values);
    }
  }
}
