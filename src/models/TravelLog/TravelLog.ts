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
  comments: z.string().min(1),
  image: z.string().url(errors.url), // image must be an url
  rating: z.number().min(0).max(10).default(0),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  visitDate: z.date(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLog = z.infer<typeof TravelLog>;
