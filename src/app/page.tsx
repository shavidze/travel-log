import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import TravelLogSideBar from '@/components/TravelLogSidebar';
import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import { MarkerProvider } from '@/context/Marker/MarkerProvider';
import { TravelLogEntryWithId } from '@/models/TravelLog/TravelLog';

const TravelLogMap = dynamic(() => import('@/components/TravelLogMap'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Page() {
  const logs = await TravelLogs.aggregate<TravelLogEntryWithId>([
    {
      $addFields: { _id: { $toString: '$_id' } },
    },
  ]).toArray();
  return (
    <>
      <main className="w-full h-full">
        <MarkerProvider>
          <TravelLogSideBar />
          <TravelLogMap logs={logs} />
        </MarkerProvider>
      </main>
    </>
  );
}
