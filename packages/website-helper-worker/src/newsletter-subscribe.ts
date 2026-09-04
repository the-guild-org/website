import { jsonResponse } from './http';

interface Args {
  request: Request;
  body: unknown;
}

export async function handleSubscribeToNewsletter({ request, body }: Args, token: string) {
  const rawEmail = (body as { email?: unknown } | null)?.email;
  const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';

  if (!email) {
    return jsonResponse({ status: 'error', message: 'Email is required.' }, 400, request.headers);
  }

  // workerd has a native FormData - no Node shim needed.
  const formData = new FormData();
  formData.append('email', email);
  formData.append('reactivate_existing', 'true');
  formData.append('send_welcome_email', 'true');

  const response = await fetch(
    'https://api.beehiiv.com/v2/publications/pub_638579f2-e96e-49d6-8cc5-346e2c2be11d/subscriptions',
    {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    },
  );

  if (!response.ok) {
    // Visible in `wrangler tail` — otherwise a revoked API key would fail
    // every subscription without a trace.
    console.error(`Beehiiv subscription request failed with status ${response.status}`);
    return jsonResponse(
      { status: 'error', message: 'Subscription failed. Please try again later.' },
      200,
      request.headers,
    );
  }

  // Beehiiv reports a subscription lifecycle status, not just success/error.
  const { data: responseData } = await response.json<{
    data: {
      status: string;
      message: string;
    };
  }>();

  const getResponse = (status: string) => {
    switch (status) {
      case 'validating':
      case 'pending':
        return {
          status: 'success',
          message: 'Please check your email to confirm your subscription.',
        };
      case 'invalid':
        return { status: 'error', message: 'Email is invalid.' };
      default:
        return { status: 'success', message: 'Subscription is active.' };
    }
  };

  return jsonResponse(getResponse(responseData.status), 200, request.headers);
}
