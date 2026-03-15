export async function createTrackingEvent(input: {
  trackingId: string;
  dateLabel: string;
  amount: string;
  category: string;
  merchant: string;
  note?: string;
}) {
  return Promise.resolve({
    success: true,
    event: {
      id: 'tracking-event-new',
      ...input,
      qualified: true,
    },
  });
}
