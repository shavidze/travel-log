/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

const errors = {
  title: 'Title cannot be empty',
  description: 'Description cannot be empty',
  url: 'Image must be a valid URL',
};

export const TravelLog = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().trim().min(1, errors.description),
  image: z.string().url(errors.url), // image must be an url
  rating: z.coerce.number().min(0).max(10).default(0), // თუ სტრინგი შევა გადაიყვანს ნამბერში
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.coerce.date(),
  apiKey: z.string().min(1),
});

export const TravelLogProperties = TravelLog.keyof().Enum;
export type TravelLogProperty = keyof typeof TravelLogProperties;
export type TravelLogProperyWithoutLocation = Exclude<
  TravelLogProperty,
  'longitude' | 'latitude'
>;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLog = z.infer<typeof TravelLog>;
