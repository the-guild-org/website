import fs from 'node:fs';
import path from 'node:path';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllArticles } from '../../lib/get-all-articles';

export const config = {
  api: {
    bodyParser: false,
  },
  unstable_includeFiles: ['pages/blog'],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tags = Array.isArray(req.query.tags) ? req.query.tags : [];
  console.log(process.cwd())
  console.log(fs.readdirSync(process.cwd()))
  console.log(fs.readdirSync(path.join(process.cwd(), 'pages/blog')))
  const articles = await getAllArticles(tags);
  res.json(articles);
  res.end();
};
