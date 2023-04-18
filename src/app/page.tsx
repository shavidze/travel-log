import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogMap from '@/components/TravelLogMap';
import TravelLogSideBar from '@/components/TravelLogSidebar';

export default async function Page() {
  const logs = await TravelLogs.find().toArray();
  return (
    <>
      <main className="w-full h-full">
        <TravelLogMap logs={logs} />
        <TravelLogSideBar />
      </main>
    </>
  );
}
