import { Injectable } from '@angular/core';
import socketIO from 'socket.io';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { resolve } from 'url';
import { reject } from 'q';
import { Router } from '@angular/router';
import { isObject } from 'util';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;
  public token: string;
  public estado_token = false;
  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.checkstatus();
  }
  // Checa el estado del server
  checkstatus() {
    // si de conecta el servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargar_storage();
    });
    // si se desconecta
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });

  }
  // Emitir todos los eventos de la app angular  evento: tipo, payload?:que vas a enviar , callback?: Function
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback); // hace uso de la class socket
  }
  // escucha los eventos del servidor
  listen(evento: string) {
    // regresa  un observable del evento
    return this.socket.fromEvent(evento);
  }

  loginWs(nombre: string) {
    this.token = localStorage.getItem('token');
    // tslint:disable-next-line:no-shadowed-variable
      this.emit('verificar-token', this.token, (res_token) => {
        // console.log('Verificando Token', res_token);
        if (res_token.ok) {
          this.emit('configurar-usuario', { nombre }, (res) => {
            // console.log('Configurar usuario', res);
          });
          this.router.navigateByUrl('/mensajes');
        } else {
          this.logout();
        }
      });
  }
  logout() {
    this.usuario = null;
    this.token = null;
    this.estado_token = false;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => { });
    this.router.navigateByUrl('/');
  }


  getUsuario() {
    return this.usuario;
  }
  cargar_storage() {
    if (
      !localStorage.getItem('token') || !localStorage.getItem('usuario')
    ) {
      return this.logout();
    }
      const tama = localStorage.getItem('usuario').length;
      if (localStorage.getItem('usuario').substr(0, 1) !== '{' || localStorage.getItem('usuario').substr(tama - 1, tama - 1) !== '}' ) {
      return this.logout();
      }
      this.usuario = new Usuario(JSON.parse(localStorage.getItem('usuario')));
      if ( !this.usuario.verificar(this.usuario)  ) {
        return this.logout();
      }
      this.token = localStorage.getItem('token');
      this.loginWs(this.usuario._id);
  }
}
