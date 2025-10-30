import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authStore } from './auth.store';
import { environment } from '@environments/environment';
import { User } from '@appModels/*';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string) {
    authStore.update(state => ({ ...state, loading: true }));
    this.http.post<User>(`${environment.apiUrl}/auth/login`, { username, password }).subscribe({
      next: (result: User) => {
        if (result.token) {
          authStore.update(state => ({
            ...state,
            user: result,
            loading: false
          }));
        } else {
          authStore.update(state => ({ ...state, loading: false }));
          console.error('Connexion échouée');
        }
      },
      error: (err) => {
        authStore.update(state => ({ ...state, loading: false }));
        console.error('Erreur HTTP', err);
      }
    });
  }

  register(username: string, password: string) {
    authStore.update(state => ({ ...state, loading: true }));
    try {
      this.http.post<User>(`${environment.apiUrl}/auth/register`, { username, password }).pipe(
        map((result: User) => {
          if (result.token) {
            authStore.update(state => ({
              ...state,
              user: result,
              loading: false
            }));
          } else {
            authStore.update(state => ({ ...state, loading: false }));
            throw new Error('Inscription échouée');
          }
        })
      );
    } catch (error) {
      authStore.update(state => ({ ...state, loading: false }));
      throw error;
    }
  }
}
