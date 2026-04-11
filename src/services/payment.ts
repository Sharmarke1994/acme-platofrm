export async function processPayment(amount: number, currency: string) {
  // TODO: integrate Stripe
  return { success: true, amount, currency };
}

export async function refundPayment(transactionId: string) {
  // TODO: handle refund logic
  return { refunded: true, transactionId };
}
