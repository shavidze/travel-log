/* eslint-disable import/prefer-default-export */
import { TravelLog, TravelLogs } from '@/models/TravelLog/TravelLogs';
// import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const logs = await TravelLogs.find().toArray();
  // console.log('mevidaaaaaaa---', logs);
  return NextResponse.json({ logs });
}

export async function POST(req: Request) {
  const res = await req.json();
  const validatedLog = await TravelLog.parseAsync(res);
  const insertResult = await TravelLogs.insertOne(validatedLog);
  return NextResponse.json({
    ...validatedLog,
    _id: insertResult.insertedId,
  });
}
