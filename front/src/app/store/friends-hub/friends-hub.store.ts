import { Friend } from '@appModels/*';
import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

export const friendsStore = createStore(
  { name: 'friends' },
  withEntities<Friend>()
);
