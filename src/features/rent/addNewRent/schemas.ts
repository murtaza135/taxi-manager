import { z } from 'zod';

export const addNewRentSchema = z.object({
  hire_id: z
    .number({ required_error: 'Taxi required' })
    .positive('Taxi required'),
  number_plate: z
    .string({ required_error: 'Number plate required' })
    .trim()
    .toUpperCase()
    .min(1, 'Number plate required')
    .transform((val) => val.replace(/\s/g, '')),
  phc_number: z
    .string()
    .trim()
    .toUpperCase()
    .optional()
    .or(z.literal('')),
  driver_name: z
    .string({ required_error: 'Driver required' })
    .trim()
    .min(1, 'Driver required'),
});

export type AddNewRentSchema = z.infer<typeof addNewRentSchema>;
