import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PatrimonioListComponent } from './components/patrimonio-list/patrimonio-list.component';
import { PatrimonioDetailsComponent } from './components/patrimonio-details/patrimonio-details.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { EventoDetailsComponent } from './components/evento-details/evento-details.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth-interceptor.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { FilterTicketsPipe } from './pipes/filter-tickets.pipe';
import { FilterEventsPipe } from './pipes/filter-events.pipe';
import { FilterPatrimonioPipe } from './pipes/filter-patrimonio.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PatrimonioListComponent,
    PatrimonioDetailsComponent,
    EventoListComponent,
    EventoDetailsComponent,
    TicketAddComponent,
    TicketListComponent,
    TicketDetailsComponent,
    LoginComponent,
    RegisterComponent,
    FilterTicketsPipe,
    FilterEventsPipe,
    FilterPatrimonioPipe,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
