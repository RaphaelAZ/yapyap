import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { upsertEntities, updateEntities } from '@ngneat/elf-entities';
import { friendsStore } from './friends-hub.store';
import { Friend } from '@appModels/*';
import { environment } from '@environments/environment';
import { authQuery } from '@appStore/auth/auth.query';

@Injectable({ providedIn: 'root' })
export class FriendsService {
  constructor(private http: HttpClient) {}

  loadFriends() {
    const token = authQuery.user?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Friend[]>(`${environment.apiUrl}/api/friends`, { headers }).subscribe(friends =>
      friendsStore.update(upsertEntities(friends))
    );
  }

  acceptFriend(friendId: string) {
    friendsStore.update(
      updateEntities(friendId, { status: 'accepted' })
    );
  }
}
