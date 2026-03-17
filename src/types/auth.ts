export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type AuthUser = {
  id: string;
  identifier?: string;
  fullName?: string;
  email?: string;
  phone?: string;
};

export type LoginRequest = {
  identifier: string;
  password: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type PasswordResetRequest = {
  identifier: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type LogoutRequest = {
  refreshToken: string;
};

export type AuthResponse = {
  success: boolean;
  user: AuthUser;
  session?: AuthSession;
  message?: string;
};

export type CurrentUserResponse = AuthUser;
