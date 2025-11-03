import { select } from "@ngneat/elf";
import { friendsStore } from "./friends-hub.store";

export const friendsQuery = {
  friends$: friendsStore.pipe(select(state => state.friends)),
  pendingRequests$: friendsStore.pipe(select(state => state.pendingRequests)),
  loading$: friendsStore.pipe(select(state => state.loading)),

  get friends() {
    return friendsStore.getValue().friends;
  },

  get pendingRequests() {
    return friendsStore.getValue().pendingRequests;
  }
};
