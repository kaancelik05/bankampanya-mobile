import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser, requestPasswordReset } from '@/services/api/auth';

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUser,
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerUser,
  });
}

export function usePasswordResetMutation() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}
