import { z } from 'zod';
import { requiredString } from '../util/util';

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.date({
    message: 'Date is required',
  }),
  location: z.object({
    venue: requiredString('Venue'),
    latitude: z.number({
      message: 'Latitude must be a number',
    }),
    longitude: z.number({
      message: 'Longitude must be a number',
    }),
    city: z.string().optional(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
