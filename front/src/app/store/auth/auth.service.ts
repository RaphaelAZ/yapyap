import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authStore } from './auth.store';
import { environment } from '@environments/environment';
import { User } from '@appModels/*';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from '@appStore/chat/chat.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private chatService = inject(ChatService);

  private handleAuthSuccess(result: User) {
    authStore.update(state => ({
      ...state,
      user: result,
      loading: false
    }));
    this.chatService.initConnection();
    this.router.navigate(['/hub']);
  }

  private authenticate(endpoint: string, username: string, password: string) {
    authStore.update(state => ({ ...state, loading: true }));

    return this.http.post<User>(`${environment.apiUrl}/api/auth/${endpoint}`, { username, password })
      .pipe(
        tap(result => {
          if (!result.token) throw new Error('Token manquant');
          this.handleAuthSuccess(result);
        }),
        catchError(err => {
          authStore.update(state => ({ ...state, loading: false }));
          console.error(`Erreur ${endpoint}: `, err);
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  login(username: string, password: string) {
    return this.authenticate('login', username, password);
  }

  register(username: string, password: string) {
    return this.authenticate('register', username, password);
  }
}
