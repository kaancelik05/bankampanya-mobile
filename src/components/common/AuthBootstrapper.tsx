import { useEffect } from 'react';
import { ApiError } from '@/services/api/client';
import { getCurrentUser, refreshAuthSession } from '@/services/api/auth';
import { loadPersistedAuthState } from '@/services/auth-storage';
import { useAuthStore } from '@/store/auth-store';

function isExpired(expiresAt: string | null) {
  if (!expiresAt) {
    return true;
  }

  return new Date(expiresAt).getTime() <= Date.now();
}

export function AuthBootstrapper() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const expiresAt = useAuthStore((state) => state.expiresAt);
  const hydrateAuthSession = useAuthStore((state) => state.hydrateAuthSession);
  const replaceSession = useAuthStore((state) => state.replaceSession);
  const setHydrating = useAuthStore((state) => state.setHydrating);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (accessToken) {
        return;
      }

      setHydrating(true);
      const persisted = await loadPersistedAuthState();

      if (cancelled) {
        return;
      }

      if (!persisted) {
        setHydrating(false);
        return;
      }

      hydrateAuthSession(persisted);
    })();

    return () => {
      cancelled = true;
    };
  }, [accessToken, hydrateAuthSession, setHydrating]);

  useEffect(() => {
    let cancelled = false;

    if (!refreshToken || !isExpired(expiresAt)) {
      return;
    }

    setHydrating(true);

    void refreshAuthSession({ refreshToken })
      .then(async (response) => {
        if (cancelled || !response.session) {
          return;
        }

        await replaceSession(response.session);
        setUser(response.user);
      })
      .catch(async () => {
        if (cancelled) {
          return;
        }

        await clearAuth({ notifyBackend: false });
      });

    return () => {
      cancelled = true;
    };
  }, [clearAuth, expiresAt, refreshToken, replaceSession, setHydrating, setUser]);

  useEffect(() => {
    let cancelled = false;

    if (!accessToken) {
      setHydrating(false);
      return;
    }

    setHydrating(true);

    void getCurrentUser()
      .then((user) => {
        if (cancelled) {
          return;
        }

        setUser(user);
      })
      .catch(async (error) => {
        if (cancelled) {
          return;
        }

        const isUnauthorized = error instanceof ApiError && error.status === 401;
        if (isUnauthorized && refreshToken) {
          try {
            const response = await refreshAuthSession({ refreshToken });
            if (cancelled || !response.session) {
              return;
            }

            await replaceSession(response.session);
            setUser(response.user);
            return;
          } catch {
            if (cancelled) {
              return;
            }
          }
        }

        await clearAuth({ notifyBackend: false });
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, clearAuth, refreshToken, replaceSession, setHydrating, setUser]);

  return null;
}
