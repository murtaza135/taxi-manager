import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { isValid } from 'date-fns';
import mapValues from 'lodash/mapValues';
import { ReplaceUndefinedWithNull } from '@/types/utils';

export const updateDriverDetailsSchema = z.object({
  name: z
    .string({ required_error: 'First name required' })
    .trim()
    .min(1, 'Name required'),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .optional()
    .or(z.literal('')),
  phone_number: z
    .string()
    .refine((val) => isMobilePhone(val), 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  national_insurance_number: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, 'Invalid national insurance number')
    .optional()
    .or(z.literal('')),
  date_of_birth: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date of birth' })
    .optional()
    .or(z.literal('')),
  is_retired: z
    .boolean(),
  created_at: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date' })
    .optional(),
});

export const updateDriverTransformer = (data: UpdateDriverDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateDriverDetailsSchema>
);

export const updateDriversLicenceDetailsSchema = z.object({
  licence_number: z
    .string({ required_error: 'Licence number required' })
    .trim()
    .toUpperCase()
    .min(1, 'Licence number required'),
  start_date: z
    .string({ required_error: 'Start date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' }),
  end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
});

export const updateDriversLicenceTransformer = (data: UpdateDriversLicenceDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateDriversLicenceDetailsSchema>
);

export const updateDriversTaxiBadgeDetailsSchema = z.object({
  badge_number: z
    .string({ required_error: 'Badge number required' })
    .trim()
    .min(1, 'Badge number required'),
  start_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('')),
  end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
});

export const updateDriversTaxiBadgeTransformer = (data: UpdateDriversTaxiBadgeDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateDriversTaxiBadgeDetailsSchema>
);

export type UpdateDriverDetailsSchema = z.infer<typeof updateDriverDetailsSchema>;
export type UpdateDriversLicenceDetailsSchema = z.infer<typeof updateDriversLicenceDetailsSchema>;
export type UpdateDriversTaxiBadgeDetailsSchema = z.infer<
  typeof updateDriversTaxiBadgeDetailsSchema
>;
