import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error = '';
  constructor(private rest: RestService,
    private router: Router
) { }

  ngOnInit() {
  }




    // tslint:disable-next-line:max-line-length
    registrar(email: string, password: string, nombres: string, apellidos: string, telefono: string, tipo: string, estado: string, terminos) {
      console.log('Hola', email, password, nombres, apellidos, telefono, tipo, estado, terminos);

      if (email.length === 0 || password.length === 0 ||
        nombres.length === 0 || apellidos.length === 0 ||
        telefono.length === 0 || tipo.length === 0 ||
        estado.length === 0) {
        this.error = 'Ingresa todo los datos';
      } else {
        if (terminos) {
          console.log('Hola', email, password, nombres, apellidos, telefono, tipo, estado, terminos);
          // tslint:disable-next-line:no-unused-expression
          this.rest.register({
            nombre: nombres,
            password,
            email,
            apellido: apellidos,
            telefono,
            type: tipo
          }).subscribe((data: any) => {
            if (data.ok) {
              this.error = undefined;
              setTimeout(() => {
                this.router.navigateByUrl('/login');
              }, 2000);
            } else {
              this.error = 'Error al registrar';
            }
            console.log(data);
          }, (err) => {
              console.log(err.error.err.message);
              this.error = err.error.err.message;
          });
          console.log(this.error);
        } else {
          this.error = 'Acepta los terminos para poder registrarte';
        }
      }

    }

  }


