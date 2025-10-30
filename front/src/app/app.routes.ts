import { Routes } from '@angular/router';
import { LoginComponent } from '@appComponents/auth/login.component/login.component';
import { RegisterComponent } from '@appComponents/auth/register.component/register.component';
import { ChatComponent } from '@appComponents/chat/chat.component';
import { AuthGuard } from '@appComponents/chat/chat.guard';

export const routes: Routes = [
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [] },
  { path: 'register', component: RegisterComponent, canActivate: [] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
