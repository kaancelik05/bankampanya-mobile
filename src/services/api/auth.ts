export async function loginUser(input: { identifier: string; password: string }) {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      identifier: input.identifier,
    },
  });
}

export async function registerUser(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  return Promise.resolve({
    success: true,
    user: {
      id: 'user-1',
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
    },
  });
}

export async function requestPasswordReset(input: { identifier: string }) {
  return Promise.resolve({
    success: true,
    message: `${input.identifier} için sıfırlama isteği oluşturuldu.`,
  });
}
