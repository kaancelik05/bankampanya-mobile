export async function createWalletCard(input: {
  bankName: string;
  cardType: string;
  customName: string;
}) {
  return Promise.resolve({
    success: true,
    card: {
      id: 'wallet-new',
      ...input,
      isActive: true,
    },
  });
}
