import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('cache-control', 'max-age=86400, public');
  res.json(req.query);
  res.end();
};
