import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  para: string;
  mensjesSubscription: Subscription;
  mensajes: any[] = [];
  error: string;
  elemento: HTMLElement;
  constructor(
    public chat: ChatService,
    public ws: WebsocketService
  ) { }

  ngOnInit() {
    this.chat.GetUsuariosActivos().subscribe((data) => { console.log(data); });
    this.elemento = document.getElementById('chat-mensajes');
    this.mensjesSubscription = this.chat.getMessage().subscribe(data => {
      console.log(data );
      this.mensajes.push(data);
      setTimeout(() => {
        this.elemento.scrollTop =  this.elemento.scrollHeight;

      } , 50);
    });


    this.mensjesSubscription = this.chat.getmessage_private().subscribe(data => {
      console.log(data);
      this.mensajes.push(data);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;

      }, 50);
    });
  }
  ngOnDestroy(): void {
   this.mensjesSubscription.unsubscribe();
  }

  // enviar mensajes al servidor
  enviar() {
    if ( this.para === this.ws.usuario._id) {
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
      if (this.para) {
        this.chat.sendMessage_private(this.texto, this.para);
        this.texto = '';
      } else {
        this.chat.sendMessage(this.texto);
        this.texto = '';
      }
    }
  }
}
