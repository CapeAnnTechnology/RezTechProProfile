import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { DatePipe } from '@angular/common';

import { LoadingComponent } from './loading.component';

import { AuthGuard } from './../shared/auth/auth.guard';
import { AdminGuard } from './../shared/auth/admin.guard';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    LoadingComponent
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    DatePipe,
  ],
  declarations: [
    LoadingComponent
  ]
})
export class SharedModule { }
