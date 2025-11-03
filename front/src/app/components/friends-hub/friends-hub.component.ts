import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { friendsQuery } from '@appStore/friends-hub/friends-hub.query';
import { FriendsService } from '@appStore/friends-hub/friends-hub.service';
import { ButtonComponent } from "@appUtils/core-utils/button.component/button.component";

@Component({
  selector: 'app-friends-hub',
  imports: [AsyncPipe, ButtonComponent],
  templateUrl: './friends-hub.component.html',
  styleUrl: './friends-hub.component.scss',
})
export class FriendsHubComponent implements OnInit {
  friendsQuery = friendsQuery;
  private friendsService = inject(FriendsService);
  private router = inject(Router)

  ngOnInit() {
    this.friendsService.loadFriends();
    this.friendsService.loadPendingRequests();
  }

  goToChat(friendId: string) {
    this.router.navigate(['/chat', friendId]);
  }
}
