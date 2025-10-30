import { AuthState, authStore } from "./auth.store";

export const authQuery = {
  isLoading: authStore.query((state: AuthState) => state.loading),
  getUser: authStore.query((state: AuthState) => state.user),
  isLoggedIn: authStore.query((state: AuthState) => !!state.user?.id),
}
