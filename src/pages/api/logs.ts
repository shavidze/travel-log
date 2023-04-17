// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TravelLog } from '@/models/TravelLog/TravelLog';
import { TravelLogWithId, TravelLogs } from '@/models/TravelLog/TravelLogs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithId | TravelLogWithId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'POST':
        const validatedLog = await TravelLog.parseAsync(req.body);
        const insertResult = await TravelLogs.insertOne(validatedLog);
        return res.status(200).json({
          ...validatedLog,
          _id: insertResult.insertedId,
        });
      case 'GET':
        const logs = await TravelLogs.find().toArray();
        return res.status(200).json(logs);

      default:
        throw new Error('Not Supported');
    }
  } catch (error) {
    return '';
  }
}
