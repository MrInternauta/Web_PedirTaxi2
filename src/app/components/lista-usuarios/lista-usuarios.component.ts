import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuariosActivosObs: Observable<any>;
  elemento: HTMLElement;
  constructor(
    public chatServices: ChatService,
    private router: Router,
    private ws: WebsocketService
  ) { }

  ngOnInit() {
    console.log('Hola lista');
    this.usuariosActivosObs = this.chatServices.GetUsuariosActivos();
    // this.elemento.scrollTop = this.elemento.scrollHeight;

  }

  select(usuario) {
    if (usuario === '') {
      return this.router.navigateByUrl(`/mensajes`);
    }
    console.log(usuario);
    this.router.navigateByUrl(`/mensajes/${usuario}`);
  }

}
