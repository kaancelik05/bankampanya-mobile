import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  LogoutRequest,
  PasswordResetRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from '@/types/auth';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';

function createMockSession() {
  return {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  };
}

function warnMockAuthUsage(action: 'login' | 'register' | 'password-reset' | 'me' | 'refresh' | 'logout') {
  if (typeof console !== 'undefined') {
    console.warn(`[auth] ${action} is running in mock mode.`);
  }
}

async function loginUserMock(input: LoginRequest): Promise<AuthResponse> {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      identifier: input.identifier,
    },
    session: createMockSession(),
  });
}

async function registerUserMock(input: RegisterRequest): Promise<AuthResponse> {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
    },
    session: createMockSession(),
  });
}

async function requestPasswordResetMock(input: PasswordResetRequest): Promise<AuthResponse> {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      identifier: input.identifier,
    },
    message: `${input.identifier} için sıfırlama isteği oluşturuldu.`,
  });
}

async function refreshAuthSessionMock(): Promise<AuthResponse> {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      identifier: 'demo@bankampanya.com',
      fullName: 'Demo Kullanıcı',
      email: 'demo@bankampanya.com',
      phone: '+90 555 000 00 00',
    },
    session: createMockSession(),
  });
}

async function logoutUserMock(): Promise<AuthResponse> {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
    },
    message: 'Oturum kapatıldı.',
  });
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  if (isMockMode()) {
    warnMockAuthUsage('me');
    return {
      id: 'user-1',
      identifier: 'demo@bankampanya.com',
      fullName: 'Demo Kullanıcı',
      email: 'demo@bankampanya.com',
      phone: '+90 555 000 00 00',
    };
  }

  return apiRequest<CurrentUserResponse>('/mobile/auth/me');
}

export async function loginUser(input: LoginRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    warnMockAuthUsage('login');
    return loginUserMock(input);
  }

  return apiRequest<AuthResponse>('/mobile/auth/login', {
    method: 'POST',
    body: input,
  });
}

export async function registerUser(input: RegisterRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    warnMockAuthUsage('register');
    return registerUserMock(input);
  }

  return apiRequest<AuthResponse>('/mobile/auth/register', {
    method: 'POST',
    body: input,
  });
}

export async function refreshAuthSession(input: RefreshTokenRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    warnMockAuthUsage('refresh');
    return refreshAuthSessionMock();
  }

  return apiRequest<AuthResponse>('/mobile/auth/refresh', {
    method: 'POST',
    body: input,
  });
}

export async function logoutUser(input: LogoutRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    warnMockAuthUsage('logout');
    return logoutUserMock();
  }

  return apiRequest<AuthResponse>('/mobile/auth/logout', {
    method: 'POST',
    body: input,
  });
}

export async function requestPasswordReset(input: PasswordResetRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    warnMockAuthUsage('password-reset');
    return requestPasswordResetMock(input);
  }

  return apiRequest<AuthResponse>('/mobile/auth/password-reset', {
    method: 'POST',
    body: input,
  });
}
