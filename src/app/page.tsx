import { TravelLogs } from '@/models/TravelLog';

export default async function Page() {
  const logs = await TravelLogs.find().toArray();
  return (
    <>
      <main className="bg-red-500">
        <h1>Hello World!</h1>
        <h2>There are {logs.length} in the Database.</h2>
        {logs.map((log) => (
          <div key={log._id.toString()}>{log.title}</div>
        ))}
      </main>
    </>
  );
}
