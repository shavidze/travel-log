import db from '@/db';
import { TravelLogEntry } from './TravelLog';

export { TravelLogEntry };

// You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .
// eslint-disable-next-line @typescript-eslint/no-redeclare

export const TravelLogs = db.collection<TravelLogEntry>('logs');
