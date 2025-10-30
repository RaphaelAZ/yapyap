import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authStore } from './auth.store';
import { environment } from '@environments/environment';
import { User } from '@appModels/*';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    authStore.update(state => ({ ...state, loading: true }));
    try {
      this.http.post<User>(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
        map((result: User) => {
          if (result.id) {
            authStore.update(state => ({
              ...state,
              user: result,
              loading: false
            }));
          } else {
            authStore.update(state => ({ ...state, loading: false }));
            throw new Error('Connexion échouée');
          }
        })
      );
    } catch (error) {
      authStore.update(state => ({ ...state, loading: false }));
      throw error;
    }
  }

  register(username: string, password: string) {
    authStore.update(state => ({ ...state, loading: true }));
    try {
      this.http.post<User>(`${environment.apiUrl}/auth/register`, { username, password }).pipe(
        map((result: User) => {
          if (result.id) {
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
