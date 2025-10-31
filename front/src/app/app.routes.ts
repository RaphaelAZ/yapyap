import { Routes } from '@angular/router';
import { AuthGuard } from '@appGuards/auth.guard';

export const routes: Routes = [
  { 
    path: 'chat/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('@appComponents/chat/chat.component').then(m => m.ChatComponent)
  },
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
