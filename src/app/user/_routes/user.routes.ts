import { Routes } from '@angular/router';
import { UserComponent } from './../user.component';
import { UserUpdateComponent } from './../user-update/user-update.component';

import { AuthGuard } from './../../shared/auth/auth.guard';
import { AdminGuard } from './../../shared/auth/admin.guard';


export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  // {
  //   path: 'add',
  //   component: UserAddComponent,
  //   canActivate: [
  //     AuthGuard,
  //   ],
  // },
  {
    path: ':id/update',
    component: UserUpdateComponent,
  },
  // {
  //   path: ':id',
  //   component: UserDetailComponent,
  // },
];
