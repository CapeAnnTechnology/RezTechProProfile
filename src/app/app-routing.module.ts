import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { CallbackComponent } from './pages/callback/callback.component';
import { HelpComponent } from './pages/help/help.component';

import { AuthGuard } from './shared/auth/auth.guard';
import { AdminGuard } from './shared/auth/admin.guard';


// import { VenueModule } from './venue/venue.module';
// import { VenueComponent } from './venue/venue.component';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'callback', component: CallbackComponent
  },
  {
    path: 'help', component: HelpComponent,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard
  ],
})
export class AppRoutingModule { }
// export const AppRoutingModule = RouterModule.forRoot(appRoutes);
