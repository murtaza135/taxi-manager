import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import mapValues from 'lodash/mapValues';
import { isStrongPassword } from '@/utils/string/isStrongPassword';
import { ReplaceUndefinedWithNull } from '@/types/utils';

export const companyDetailsSchema = z.object({
  name: z
    .string({ required_error: 'Company name required' })
    .trim()
    .min(1, 'Company name required'),
  company_number: z
    .string({ required_error: 'Company number required' })
    .trim()
    .toUpperCase()
    .min(1, 'Company number required'),
  address: z
    .string({ required_error: 'Address required' })
    .trim()
    .min(1, 'Address required'),
  phone_number: z
    .string()
    .refine((val) => isMobilePhone(val), 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

export const companyDetailsTransformer = (data: CompanyDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<CompanyDetailsSchema>
);

export const changeEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email required' })
    .email({ message: 'Invalid email address' }),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .refine(
      (val) => isStrongPassword(val),
      { message: 'Must contain minimum 8 characters and at least 1 lowercase, 1 uppercase and 1 digit' },
    ),
  newPassword: z
    .string()
    .refine(
      (val) => isStrongPassword(val),
      { message: 'Must contain minimum 8 characters and at least 1 lowercase, 1 uppercase and 1 digit' },
    ),
  confirmPassword: z
    .string({ required_error: 'Please confirm your new password' })
    .trim()
    .min(1, 'Please confirm your new password'),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type Day = typeof days[number];
function isDay(value: unknown): value is Day {
  return days.includes(value as Day);
}

export const rentDaySchema = z.object({
  rent_day: z
    .string({ required_error: 'Please select the day the rent should start' })
    .refine(isDay),
});

export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;
export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type RentDaySchema = z.infer<typeof rentDaySchema>;
