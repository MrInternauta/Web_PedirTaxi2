import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuardService } from './guards/usuario-guard.service';
import { SessionGuard } from './guards/session.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
const AppRoutes: Routes = [
  { path: 'login', canActivate: [SessionGuard], component: LoginComponent },
  { path: 'signup', canActivate: [SessionGuard], component: SignupComponent },
  { path: 'home', canActivate: [SessionGuard], component: HomeComponent },
  { path: 'blog', canActivate: [SessionGuard], component: HomeComponent },
  { path: 'mensajes', canActivate: [UsuarioGuardService ], component: MensajesComponent },
  { path: 'profile', canActivate: [UsuarioGuardService], component: ProfileComponent },
  { path: '**', component: HomeComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(AppRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

