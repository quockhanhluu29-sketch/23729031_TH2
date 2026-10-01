import { create } from 'zustand';

interface AuthState {
  token: string | null;
  login: (identifier: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  login: (identifier) => {
    // token giả theo yêu cầu đề: ktxgo-{mssv}-{stamp}
    const fakeToken = `ktxgo-23729031-token`;
    set({ token: fakeToken });
  },
  logout: () => set({ token: null }),
}));