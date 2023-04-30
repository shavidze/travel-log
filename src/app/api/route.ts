/* eslint-disable import/prefer-default-export */
import { TravelLog, TravelLogs } from '@/models/TravelLog/TravelLogs';
import { NextResponse } from 'next/server';

export async function GET() {
  const logs = await TravelLogs.find().toArray();
  return NextResponse.json({ logs });
}

export async function POST(req: Request) {
  const validatedLog = await TravelLog.parseAsync(req.body);
  const insertResult = await TravelLogs.insertOne(validatedLog);
  return NextResponse.json({
    ...validatedLog,
    _id: insertResult.insertedId,
  });
}
