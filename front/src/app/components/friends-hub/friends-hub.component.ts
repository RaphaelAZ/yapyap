import { Component } from '@angular/core';
import { friendsQuery } from '@appStore/friends-hub/friends-hub.query';
import { FriendsService } from '@appStore/friends-hub/friends-hub.service';

@Component({
  selector: 'app-friends-hub',
  imports: [],
  templateUrl: './friends-hub.component.html',
  styleUrl: './friends-hub.component.scss',
})
export class FriendsHubComponent {
  friends$ = friendsQuery.friends$;

  constructor(private friendsService: FriendsService) {}

  ngOnInit() {
    this.friendsService.loadFriends();
  }
}
