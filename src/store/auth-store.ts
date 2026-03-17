import { create } from 'zustand';
import type { AuthSession, AuthUser } from '@/types/auth';
import { clearPersistedAuthState, savePersistedAuthState } from '@/services/auth-storage';
import { logoutUser } from '@/services/api/auth';

type AuthState = {
  isAuthenticated: boolean;
  isHydrating: boolean;
  user: AuthUser | null;
  session: AuthSession | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  setAuthenticated: (value: boolean) => void;
  setHydrating: (value: boolean) => void;
  setAuthSession: (payload: { user: AuthUser; session?: AuthSession }) => Promise<void>;
  hydrateAuthSession: (payload: { user: AuthUser; session: AuthSession }) => void;
  replaceSession: (session: AuthSession) => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  clearAuth: (options?: { notifyBackend?: boolean }) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isHydrating: false,
  user: null,
  session: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  setAuthenticated: (value) =>
    set((state) => ({
      ...state,
      isAuthenticated: value,
    })),
  setHydrating: (value) =>
    set((state) => ({
      ...state,
      isHydrating: value,
    })),
  setAuthSession: async ({ user, session }) => {
    set({
      isAuthenticated: true,
      isHydrating: false,
      user,
      session: session ?? null,
      accessToken: session?.accessToken ?? null,
      refreshToken: session?.refreshToken ?? null,
      expiresAt: session?.expiresAt ?? null,
    });

    if (session) {
      await savePersistedAuthState({ user, session });
    }
  },
  hydrateAuthSession: ({ user, session }) =>
    set({
      isAuthenticated: true,
      isHydrating: false,
      user,
      session,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
    }),
  replaceSession: async (session) => {
    const currentUser = get().user;

    set((state) => ({
      ...state,
      session,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      isAuthenticated: !!currentUser,
      isHydrating: false,
    }));

    if (currentUser) {
      await savePersistedAuthState({ user: currentUser, session });
    }
  },
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
      isAuthenticated: !!user && !!state.accessToken,
      isHydrating: false,
    })),
  clearAuth: async (options) => {
    const refreshToken = get().refreshToken;
    const shouldNotifyBackend = options?.notifyBackend ?? true;

    if (shouldNotifyBackend && refreshToken) {
      try {
        await logoutUser({ refreshToken });
      } catch {
        // local logout should still succeed
      }
    }

    set({
      isAuthenticated: false,
      isHydrating: false,
      user: null,
      session: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    });

    await clearPersistedAuthState();
  },
}));
