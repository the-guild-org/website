import { NextApiRequest, NextApiResponse } from 'next';
import { getAllArticles } from '../../lib/get-all-articles';

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tags = Array.isArray(req.query.tags) ? req.query.tags : [];
  const articles = await getAllArticles(tags);
  res.json(articles);
  res.end();
};
