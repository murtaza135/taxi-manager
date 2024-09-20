/* eslint-disable max-len */
import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import { MergeOverwrite } from '@/types/utils';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPE = /image\/.+/;
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const publicDriverApplicationCompanyDetailsSchema = z.object({
  company_name: z
    .string({ required_error: 'Company name required' })
    .trim()
    .min(1, 'Company name required'),
});

export const publicDriverApplicationDetailsSchema = z.object({
  name: z
    .string({ required_error: 'Name required' })
    .trim()
    .min(1, 'Name required')
    .transform((val) => capitalizeEachWord(val)),
  email: z
    .string({ required_error: 'Email required' })
    .email({ message: 'Invalid email address' }),
  phone_number: z
    .string({ required_error: 'Phone number required' })
    .refine((val) => isMobilePhone(val), 'Invalid phone number'),
  national_insurance_number: z
    .string({ required_error: 'National insurance number required' })
    .trim()
    .toUpperCase()
    .min(1, 'Invalid national insurance number'),
  date_of_birth: z
    .string({ required_error: 'Date of birth required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date of birth' }),
  picture: z
    .instanceof(File, { message: 'Allowed file types: images' })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => file.type.match(ACCEPTED_IMAGE_MIME_TYPE), 'Allowed file types: images'),
});

export const publicDriverApplicationLicenceSchema = z.object({
  licence_number: z
    .string({ required_error: 'Licence number required' })
    .trim()
    .toUpperCase()
    .min(1, 'Licence number required'),
  licence_start_date: z
    .string({ required_error: 'Start date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' }),
  licence_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
  licence_document: z
    .instanceof(File, { message: 'Allowed file types: images or PDF' })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF'),
})
  .refine(
    ({ licence_start_date, licence_end_date }) => isBefore(licence_start_date, licence_end_date),
    {
      message: 'End date must come after start date',
      path: ['licence_end_date'],
    },
  );

export const publicDriverApplicationTaxiBadgeSchema = z.object({
  badge_number: z
    .string({ required_error: 'Taxi badge number required' })
    .trim()
    .min(1, 'Taxi badge number required'),
  badge_start_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('')),
  badge_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
  badge_document: z
    .instanceof(File, { message: 'Allowed file types: images or PDF' })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF'),
})
  .refine(
    ({ badge_start_date, badge_end_date }) => {
      if (badge_start_date) {
        return isBefore(badge_start_date, badge_end_date);
      }
      return true;
    },
    {
      message: 'End date must come after start date',
      path: ['badge_end_date'],
    },
  );

// combine all schemas and make all fields regarding drivers licence and taxi badge optional
export const publicDriverApplicationSchema = publicDriverApplicationDetailsSchema
  .merge(publicDriverApplicationLicenceSchema.innerType())
  .merge(publicDriverApplicationTaxiBadgeSchema.innerType());

// convert nullish values to undefined and FileList objects to File objects
export const publicDriverApplicationTransformer = (data: PublicDriverApplicationSchema) => (
  mapValues(data, (val) => {
    if (!val) return undefined;
    if (val instanceof FileList) return val[0] as File | undefined;
    return val;
  }) as PublicDriverApplicationTransformedSchema
);

export type PublicDriverApplicationCompanyDetailsSchema = z.infer<typeof publicDriverApplicationCompanyDetailsSchema>;
export type PublicDriverApplicationDetailsSchema = z.infer<typeof publicDriverApplicationDetailsSchema>;
export type PublicDriverApplicationLicenceSchema = z.infer<typeof publicDriverApplicationLicenceSchema>;
export type PublicDriverApplicationTaxiBadgeSchema = z.infer<typeof publicDriverApplicationTaxiBadgeSchema>;
export type PublicDriverApplicationSchema = z.infer<typeof publicDriverApplicationSchema>;

// convert FileList objects to File Objects
export type PublicDriverApplicationTransformedSchema = MergeOverwrite<PublicDriverApplicationSchema, {
  picture: File;
  licence_document: File;
  badge_document: File;
}>;

export type PublicDriverApplicationNullableFileListSchema = MergeOverwrite<PublicDriverApplicationSchema, {
  picture?: File | undefined;
  licence_document?: File | undefined;
  badge_document?: File | undefined;
}>;
