import { z } from 'zod';
import { requiredString } from '../util/util';

export type ActivitySchema = z.infer<typeof activitySchema>;

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.coerce.date({
    message: 'Date is required',
  }),
  location: z.object({
    venue: z.string().min(1, 'Venue is required'),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    city: z.string().optional(),
  }),
});
