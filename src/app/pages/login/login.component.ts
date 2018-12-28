import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre = '';
  pass = '';
  error: string;
  constructor(
    public wsService: WebsocketService,
    private router: Router,
    private rest: RestService
  ) {}

  ngOnInit() {
  }

  ingresar() {
    this.rest.login(this.nombre, this.pass).then(() => {
      this.wsService.cargar_storage();
    }).catch((e) => {
      this.error = e.error.message;
      console.log( e.error.message);
    });
  }
}
