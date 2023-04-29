import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import TravelLogSideBar from '@/components/TravelLogSidebar';

const TravelLogMap = dynamic(() => import('@/components/TravelLogMap'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Page() {
  const logs = await TravelLogs.find().toArray();
  console.log(TravelLogMap);
  return (
    <>
      <main className="w-full h-full">
        <TravelLogSideBar />
        <TravelLogMap logs={logs} />
      </main>
    </>
  );
}
