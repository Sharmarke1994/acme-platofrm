export async function processPayment(amount: number, currency: string) {
  // TODO: integrate Stripe
  return { success: true, amount, currency };
}

export async function refundPayment(transactionId: string) {
  // TODO: handle refund logic
  return { refunded: true, transactionId };
}

// TODO: integrate Stripe billing
// const charge = await stripe.charges.create({ amount, currency });
