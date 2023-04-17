import db from '@/db';
import { WithId } from 'mongodb';
import { TravelLog } from './TravelLog';

export { TravelLog };

// You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLogWithId = WithId<TravelLog>; // ბაზის ობიექტი უნდა იყოს mongo driver -მა რომ ჩააინსერტა აიდისთან ერთად იმ აიდით

export const TravelLogs = db.collection<TravelLog>('logs');
