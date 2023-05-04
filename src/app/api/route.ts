/* eslint-disable import/prefer-default-export */
import CustomError from '@/errors/CustomError';
import { TravelLogEntry, TravelLogs } from '@/models/TravelLog/TravelLogs';
// import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
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
  return NextResponse.json({ logs });
}

export async function POST(req: NextRequest) {
  await checkOnIPRequests();
  const body = await req.json();
  if (!process.env.API_KEY) {
    throw new Error('API_KEY missing in env');
  }
  if (body.apiKey !== process.env.API_KEY) {
    return new CustomError('Unauthorized', 401);
  }
  delete body.apiKey;
  const validatedLog = await TravelLogEntry.parseAsync(body);
  const insertResult = await TravelLogs.insertOne(validatedLog);
  return NextResponse.json({
    ...validatedLog,
    _id: insertResult.insertedId,
  });
}
