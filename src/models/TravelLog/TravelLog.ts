/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import isValidDate from 'date-fns/isValid';

const errors = {
  title: 'Title cannot be empty',
  description: 'Description cannot be empty',
  url: 'Image must be a valid URL',
  apiKey: 'API Key cannot be empty',
  visitDateString: 'Visit Date must be a valid date.',
  visitDateTimestamp: 'Visit Date must be a valid timestamp.',
};

const baseValidation = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().trim().min(1, errors.description),
  image: z.string().url(errors.url), // image must be an url
  rating: z.coerce.number().min(0).max(10).default(0), // თუ სტრინგი შევა გადაიყვანს ნამბერში
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export const TravelLogRequest = baseValidation.extend({
  visitDate: z.string().refine((date) => isValidDate(new Date(date)), {
    message: errors.visitDateString,
  }), // refine for custom validation
  apiKey: z.string().min(1, errors.apiKey),
});

export const TravelLogEntry = baseValidation.extend({
  visitDate: z
    .number()
    .or(z.string())
    .transform((date, ctx) => {
      // ctx contains caught error
      if (typeof date === 'string') {
        const validDate = isValidDate(new Date(date));
        if (!validDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date string.',
          });
          return z.NEVER; // The return value is not used, but we need to return something to satisfy the typing
        }
        return new Date(date).getTime(); // return timestamp
      }
      return date;
    })
    .refine(isValidDate, { message: errors.visitDateTimestamp }),
});

export const TravelLogEntryWithId = TravelLogEntry.extend({
  _id: z.string(),
});

export const TravelLogProperties = TravelLogRequest.keyof().Enum;
export type TravelLogProperty = keyof typeof TravelLogProperties;
export type TravelLogProperyWithoutLocation = Exclude<
  TravelLogProperty,
  'longitude' | 'latitude'
>;

export type TravelLogRequest = z.infer<typeof TravelLogRequest>;
export type TravelLogEntry = z.infer<typeof TravelLogEntry>;
export type TravelLogEntryWithId = z.infer<typeof TravelLogEntryWithId>;
