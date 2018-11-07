import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DatePipe } from '@angular/common';

import { LoadingComponent } from './loading.component';
import { SubmittingComponent } from './submitting.component';

import { AuthGuard } from './../shared/auth/auth.guard';
import { AdminGuard } from './../shared/auth/admin.guard';

import { UserService } from './../shared/_services/';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    LoadingComponent,
    SubmittingComponent
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    DatePipe,
    UserService,
  ],
  declarations: [
    LoadingComponent,
    SubmittingComponent
  ]
})
export class SharedModule { }
