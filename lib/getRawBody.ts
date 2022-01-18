import { NextApiRequest } from 'next';

export function getRawBody(req: NextApiRequest) {
  return new Promise((resolve) => {
    const bodyChunks: Buffer[] = [];
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8');
      resolve(rawBody);
    });
    req.on('data', (chunk) => bodyChunks.push(chunk));
  });
}
