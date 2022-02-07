import { linkPreview } from 'link-preview-node';
import { decode } from 'html-entities';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end();
    return;
  }

  const data = await linkPreview(req.query.url);

  data.title = decode(data.title);
  data.description = decode(data.description);

  res.setHeader('cache-control', 'max-age=86400, public');
  res.json(data);
  res.end();
};
