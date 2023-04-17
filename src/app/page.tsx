import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogsForm from '@/components/TravelLogsForm';

export default async function Page() {
  const logs = await TravelLogs.find().toArray();
  return (
    <>
      <main className="w-full">
        <h1 className="text-3xl font-bold underline">Hello World!</h1>
        <h2>There are {logs.length} in the Database.</h2>
        {logs.map((log) => (
          <div key={log._id.toString()}>{log.title}</div>
        ))}
        <TravelLogsForm />
      </main>
    </>
  );
}
