import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editprofile: false;
  constructor(
    private WS: WebsocketService,
    private rest: RestService
  ) {
    console.log(this.WS.usuario.img);
   }

  ngOnInit() {
  }

}
