import { Routes } from '@angular/router';
import { ProfileComponent } from './../profile.component';
import { ProfileUpdateComponent } from './../profile-update/profile-update.component';

import { AuthGuard } from './../../shared/auth/auth.guard';
import { AdminGuard } from './../../shared/auth/admin.guard';


export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  // {
  //   path: 'add',
  //   component: ProfileAddComponent,
  //   canActivate: [
  //     AuthGuard,
  //   ],
  // },
  {
    path: ':id/update',
    component: ProfileUpdateComponent,
  },
  // {
  //   path: ':id',
  //   component: ProfileDetailComponent,
  // },
];
