import { Routes } from '@angular/router';
import { AuthGuard } from '@appGuards/auth.guard';

const PROTECTED_ROUTES = [
  {
    path: 'hub',
    canActivate: [AuthGuard],
    loadComponent: () => import('@appComponents/friends-hub/friends-hub.component').then(m => m.FriendsHubComponent)
  },
  {
    path: 'chat/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('@appComponents/chat/chat.component').then(m => m.ChatComponent)
  },
];

export const routes: Routes = [
  ...PROTECTED_ROUTES,
  {
    path: 'login',
    loadComponent: () => import('@appComponents/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('@appComponents/auth/register/register.component').then(m => m.RegisterComponent)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
