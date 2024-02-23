import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { RegisterComponent } from './components/register/register.component';
import { PatrimonioListComponent } from './components/patrimonio-list/patrimonio-list.component';
import { PatrimonioDetailsComponent } from './components/patrimonio-details/patrimonio-details.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { EventoDetailsComponent } from './components/evento-details/evento-details.component';

const routes: Routes = [
  {
    path: 'patrimonios-details/:id', component : PatrimonioDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'patrimonios-list', component : PatrimonioListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'event-details/:id', component : EventoDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'event-list', component : EventoListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ticket-add', component : TicketAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ticket-list', component : TicketListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ticket-details/:id', component : TicketDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '**', redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
