import { z } from 'zod';
import db from '@/db';
import { WithId } from 'mongodb';

export const TravelLog = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  comments: z.string().min(1),
  image: z.string().url(), // image must be an url
  rating: z.number().min(0).max(10).default(0),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  visitDate: z.date(),
});
// You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLog = z.infer<typeof TravelLog>;

export const TravelLogs = db.collection<TravelLog>('logs');
export type TravelLogWithId = WithId<TravelLog>; // ბაზის ობიექტი უნდა იყოს mongo driver -მა რომ ჩააინსერტა აიდისთან ერთად იმ აიდით
