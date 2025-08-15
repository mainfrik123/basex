import { create } from 'zustand';
import type { User } from '@bc/auth/domain/entities/User';

type State = {
  currentUser?: User;
  setCurrentUser: (u?: User) => void;
  logout: () => void;
};

export const useAuthStore = create<State>((set) => ({
  currentUser: undefined,
  setCurrentUser: (u) => set({ currentUser: u }),
  logout: () => set({ currentUser: undefined }),
}));
