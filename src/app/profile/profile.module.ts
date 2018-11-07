import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './_routes/profile.routes';

import { SharedModule } from './../shared';
import { SocketService, UtilsService } from './../shared/_services';

import { ProfileComponent } from './profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileUpdateComponent,
    ProfileFormComponent,
  ]
})
export class ProfileModule { }
