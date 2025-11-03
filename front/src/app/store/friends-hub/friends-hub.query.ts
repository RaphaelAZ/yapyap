import { selectAllEntities } from "@ngneat/elf-entities";
import { friendsStore } from "./friends-hub.store";

export const friendsQuery = {
  friends$: friendsStore.pipe(selectAllEntities()),
};
