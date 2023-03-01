import FormData from 'form-data';

export default async function handler(req, res) {
  const email = JSON.parse(req.body).email;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const formData = new FormData();

  formData.append('email', email);
  formData.append('reactivate_existing', 'true');
  formData.append('send_welcome_email', 'true');

  const response = await fetch(
    'https://api.beehiiv.com/v2/publications/pub_638579f2-e96e-49d6-8cc5-346e2c2be11d/subscriptions',
    {
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
      },
      method: 'POST',
    }
  );

  const { data: responseData } = await response.json();

  const getResponse = (status: string) => {
    switch (status) {
      case 'validating':
        return { status: 'success', message: 'Please check your email to confirm your subscription.' };
      case 'pending':
        return { status: 'success', message: 'Please check your email to confirm your subscription.' };
      case 'invalid':
        return { status: 'error', message: 'Email is invalid.' };
      default:
        return { status: 'success', message: 'Subscription is active.' };
    }
  };

  return res.json(getResponse(responseData.status));
}
