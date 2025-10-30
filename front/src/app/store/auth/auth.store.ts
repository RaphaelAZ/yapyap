import { User } from '@appModels/*';
import { createStore, withProps } from '@ngneat/elf';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const authStore = createStore(
  { name: 'auth' },
  withProps<AuthState>({
    user: null,
    loading: false,
  })
);
