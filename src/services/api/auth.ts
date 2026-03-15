import type { AuthResponse, LoginRequest, PasswordResetRequest, RegisterRequest } from '@/types/auth';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';

async function loginUserMock(input: LoginRequest): Promise<AuthResponse> {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      identifier: input.identifier,
    },
    session: {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    },
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
    session: {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    },
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

export async function loginUser(input: LoginRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    return loginUserMock(input);
  }

  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: input,
  });
}

export async function registerUser(input: RegisterRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    return registerUserMock(input);
  }

  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: input,
  });
}

export async function requestPasswordReset(input: PasswordResetRequest): Promise<AuthResponse> {
  if (isMockMode()) {
    return requestPasswordResetMock(input);
  }

  return apiRequest<AuthResponse>('/auth/forgot-password', {
    method: 'POST',
    body: input,
  });
}
