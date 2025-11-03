import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { friendsStore } from './friends-hub.store';
import { Friend } from '@appModels/*';
import { environment } from '@environments/environment';
import { authQuery } from '@appStore/auth/auth.query';

@Injectable({ providedIn: 'root' })
export class FriendsService {
  private httpClient = inject(HttpClient);
  token = authQuery.user?.token;
  header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  loadFriends() {
    friendsStore.update(state => ({ ...state, loading: true }));

    this.httpClient.get<Friend[]>(`${environment.apiUrl}/api/friends`, { headers: this.header }).subscribe({
      next: (friends) => {
        friendsStore.update(state => ({ ...state, friends, loading: false }));
      },
      error: () => friendsStore.update(state => ({ ...state, loading: false }))
    });
  }

  loadPendingRequests() {
    friendsStore.update(state => ({ ...state, loading: true }));

    this.httpClient.get<Friend[]>(`${environment.apiUrl}/api/friends/requests`, { headers: this.header }).subscribe({
      next: (pendingRequests) => {
        friendsStore.update(state => ({ ...state, pendingRequests, loading: false }));
      },
      error: () => friendsStore.update(state => ({ ...state, loading: false }))
    });
  }
}
