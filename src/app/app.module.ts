import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { AuthService, UtilsService } from './shared/_services';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';

import { CallbackComponent } from './pages/callback/callback.component';
import { HelpComponent } from './pages/help/help.component';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    FooterComponent,
    HeaderComponent,
    HelpComponent,
    HomeComponent,
    SidenavComponent,
    ToolbarComponent,
  ],
  imports: [
    // VenueModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [Title, AuthService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
