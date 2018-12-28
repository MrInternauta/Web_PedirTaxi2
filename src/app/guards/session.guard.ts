import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(public wsService: WebsocketService,
    private router: Router) {

  }
  canActivate() {
    if (this.wsService.getUsuario()) {
      this.router.navigateByUrl('/mensajes');
      return false;
    } else {
     return true;
    }
  }
}
