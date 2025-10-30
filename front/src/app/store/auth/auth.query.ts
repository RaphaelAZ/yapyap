import { select } from '@ngneat/elf';
import { authStore } from "./auth.store";

export const authQuery = {
  user$: authStore.pipe(select(state => state.user)),
  loading$: authStore.pipe(select(state => state.loading)),
  isLoggedIn$: authStore.pipe(select(state => !!state.user?.token))
};
