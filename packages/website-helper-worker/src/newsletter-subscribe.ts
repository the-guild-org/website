import { buildResponseCorsHeaders } from './cors';
import FormData from 'form-data';

interface Args {
  request: Request;
  body: {
    email: string;
  };
}
export async function handleSubscribeToNewsletter({ request: req, body }: Args, token: string) {
  const { email } = body;

  const formData = new FormData();

  formData.append('email', email);
  formData.append('reactivate_existing', 'true');
  formData.append('send_welcome_email', 'true');

  const response = await fetch(
    'https://api.beehiiv.com/v2/publications/pub_638579f2-e96e-49d6-8cc5-346e2c2be11d/subscriptions',
    {
      body: formData as unknown as BodyInit,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    },
  );

  const { data: responseData } = await response.json<{
    data: {
      status: 'error' | 'success';
      message: string;
    };
  }>();

  const getResponse = (status: string) => {
    switch (status) {
      case 'validating':
        return {
          status: 'success',
          message: 'Please check your email to confirm your subscription.',
        };
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

  return new Response(JSON.stringify(getResponse(responseData.status)), {
    status: 200,
    headers: {
      ...buildResponseCorsHeaders(req.headers),
      contentType: 'application/json',
    },
  });
}
