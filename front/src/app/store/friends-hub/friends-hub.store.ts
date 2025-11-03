import { createStore, withProps } from '@ngneat/elf';
import { Friend } from '@appModels/friend.model';

export interface FriendsState {
  friends: Friend[];
  pendingRequests: Friend[];
  loading: boolean;
}

export const friendsStore = createStore(
  { name: 'friends' },
  withProps<FriendsState>({
    friends: [],
    pendingRequests: [],
    loading: false
  })
);
