import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription, Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  texto = '';
  chat_select = '';
  mensjesSubscription: Subscription;
  mensajes: any[] = [];
  mensajes_otros: any[] = [];
  usuarios: any[] = [];
  error: string;
  elemento: HTMLElement;
  usuariosActivosObs: Observable<any>;
  usuariosActivos: any;


  constructor(
    public ws: WebsocketService,
    public chat: ChatService,
    private rest: RestService
  ) {}

  ngOnInit() {
    this.chat.emmitirGetUsuariosActivos();
    this.usuariosActivosObs = this.chat.GetUsuariosActivos();
    this.chat.GetUsuariosActivos().subscribe((data: any) => {
      // console.log(data);
    });
    this.elemento = document.getElementById('chat-mensajes');
    this.listen_messages();
    this.getMessagesPublic();

  }




  // ngOnInit() {
  //   // this.chat.emmitirGetUsuariosActivos();
  //   this.usuariosActivosObs = this.chat.GetUsuariosActivos();
  //   this.usuariosActivosObs.subscribe((data: any) => {
  //     data.forEach((element) => {
  //       const finduser = this.usuariosActivos.find((usuario) => usuario._id === element.nombre);
  //       if (!finduser && element.nombre !== this.ws.usuario._id) {
  //         this.rest.get(`usuario/mostar/${element.nombre}`).subscribe((user: any) => {
  //           console.log(user.usuario);
  //           if (user.usuario) {
  //             this.usuariosActivos.push(user.usuario);
  //           }
  //         });
  //       }
  //     });
  //   });
  //   this.elemento = document.getElementById('chat-mensajes');
  //   this.listen_messages();
  //   this.getMessagesPublic();

  // }


  listen_messages () {

    this.mensjesSubscription = this.chat.getMessage().subscribe(data => {
      if (this.chat_select === '') {
        console.log(data);
        this.mensajes.push(data);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      } else {
        this.mensajes_otros.push(data);
      }
    });

    this.mensjesSubscription = this.chat
      .getmessage_private()
      .subscribe((data: any) => {
        if (this.chat_select === data.de._id || this.chat_select === data.para._id
          || data.de._id === this.ws.usuario._id || data.para._id === this.ws.usuario._id) {
          console.log(data);
          this.mensajes.push(data);
          setTimeout(() => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 50);
        } else {
          this.mensajes_otros.push(data);
        }
      });

  }

  // Traer mensajes
  getMessages (de: string, para: string) {
    this.rest.post('mensajesGET',  { de, para }).subscribe((data: any) => {
      // console.log(data.respuesta);
      this.mensajes = data.respuesta;
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  getMessagesPublic() {
    this.rest.get('mensajes').subscribe((data: any) => {
      // console.log(data.respuesta);
      this.mensajes = data.respuesta;
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  // enviar mensajes al servidor
  enviar() {
    if (this.chat_select === this.ws.usuario._id) {
      this.error = 'No puede enviarte mensajes a ti mismo';
      console.log(this.error);
      setTimeout(() => {
        this.error = '';
        console.log(this.error);
      }, 3000);
    } else {
      if (this.texto.trim().length === 0) {
        return;
      }
      if (this.chat_select) {
        this.chat.sendMessage_private(this.texto, this.chat_select);
        this.texto = '';
      } else {
        this.chat.sendMessage(this.texto);
        this.texto = '';
      }
    }
  }

  salir() {
    this.ws.logout();
  }

  seleccionar(usuario) {

    if (usuario === '') {
      this.chat_select = '';
      this.getMessagesPublic();
    } else {
      this.chat_select = usuario;
      this.getMessages(this.ws.usuario._id, this.chat_select);
    }
  }
}
