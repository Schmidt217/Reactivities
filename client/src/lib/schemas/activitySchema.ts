import { z } from 'zod';

export type ActivitySchema = z.infer<typeof activitySchema>;

const requiredString = (fieldName: string) =>
  z.string().min(1, { message: `${fieldName} is required` });

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
