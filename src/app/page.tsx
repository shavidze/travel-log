import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogMap from '@/components/TravelLogMap';
import Link from 'next/link';

export default async function Page() {
  const logs = await TravelLogs.find().toArray();
  return (
    <>
      <main className="w-full h-full">
        <TravelLogMap logs={logs} />
        {/* <TravelLogsForm /> */}
        <div className="fixed top-2 right-2 z-[999]">
          <Link href="/add" className="btn btn-info">
            Add Travel Log
          </Link>
        </div>
      </main>
    </>
  );
}
