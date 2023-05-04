import { NextApiRequest, NextApiResponse } from 'next';

/* eslint-disable import/prefer-default-export */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  try {
    const path = req.query.path as string;
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
