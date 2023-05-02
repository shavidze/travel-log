/* eslint-disable import/prefer-default-export */
import CustomError from '@/errors/CustomError';
import { TravelLog, TravelLogs } from '@/models/TravelLog/TravelLogs';
// import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import LambdaRateLimiter from 'lambda-rate-limiter';
import { headers } from 'next/dist/client/components/headers';

const limiter = LambdaRateLimiter({
  interval: 60000,
  uniqueTokenPerInterval: 500,
});

const localhost = 'localhost';

const checkOnIPRequests = async () => {
  const headersList = headers();
  const IP = headersList.get('x-real-ip')?.toString() || localhost;
  if (IP !== localhost) {
    try {
      await limiter.check(20, IP);
    } catch (error) {
      throw new CustomError('Too Many Requests', 429);
    }
  }
};

export async function GET() {
  await checkOnIPRequests();
  const logs = await TravelLogs.find().toArray();
  // console.log('mevidaaaaaaa---', logs);
  return NextResponse.json({ logs });
}

export async function POST(req: Request) {
  await checkOnIPRequests();
  const res = await req.json();
  if (!process.env.API_KEY) {
    throw new Error('API_KEY missing in env');
  }
  if (res.apiKey !== process.env.API_KEY) {
    return new CustomError('Unauthorized', 401);
  }
  delete res.apiKey;
  const validatedLog = await TravelLog.parseAsync(res);
  const insertResult = await TravelLogs.insertOne(validatedLog);
  return NextResponse.json({
    ...validatedLog,
    _id: insertResult.insertedId,
  });
}
