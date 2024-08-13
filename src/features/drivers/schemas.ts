import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import isDate from 'validator/es/lib/isDate';
import mapValues from 'lodash/mapValues';
import { isBefore } from 'date-fns';
import { MergeOverwrite } from '@/types/utils';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPE = /image\/.+/;
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const addNewDriverDetailsSchema = z.object({
  name: z
    .string({ required_error: 'First name required' })
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
    .min(1, 'Invalid national insurance number')
    .optional()
    .or(z.literal('')),
  date_of_birth: z
    .string()
    .refine((val) => isDate(val), { message: 'Invalid date of birth' })
    .optional()
    .or(z.literal('')),
  picture: z
    .instanceof(FileList, { message: 'Allowed file types: images' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_IMAGE_MIME_TYPE), 'Allowed file types: images')
    .optional(),
});

export const addNewDriversLicenceSchema = z.object({
  licence_number: z
    .string({ required_error: 'Licence number required' })
    .min(1, 'Licence number required'),
  licence_start_date: z
    .string({ required_error: 'Start date required' })
    .refine((val) => isDate(val), { message: 'Invalid start date' }),
  licence_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isDate(val), { message: 'Invalid end date' }),
  licence_document: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
})
  .refine(
    ({ licence_start_date, licence_end_date }) => isBefore(licence_start_date, licence_end_date),
    {
      message: 'End date must come after start date',
      path: ['licence_end_date'],
    },
  );

export const addNewDriverTaxiBadgeSchema = z.object({
  badge_number: z
    .string({ required_error: 'Taxi badge number required' })
    .min(1, 'Taxi badge number required'),
  badge_start_date: z
    .string()
    .refine((val) => isDate(val), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('')),
  badge_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isDate(val), { message: 'Invalid end date' }),
  badge_document: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
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
export const addNewDriverSchema = addNewDriverDetailsSchema
  .merge(addNewDriversLicenceSchema.innerType())
  .merge(addNewDriverTaxiBadgeSchema.innerType())
  .extend({
    licence_number: z
      .string()
      .min(1, 'Licence number required')
      .optional()
      .or(z.literal('')),
    licence_start_date: z
      .string()
      .refine((val) => isDate(val), { message: 'Invalid start date' })
      .optional()
      .or(z.literal('')),
    licence_end_date: z
      .string()
      .refine((val) => isDate(val), { message: 'Invalid end date' })
      .optional()
      .or(z.literal('')),
  })
  .extend({
    badge_number: z
      .string()
      .min(1, 'Taxi badge number required')
      .optional()
      .or(z.literal('')),
    badge_end_date: z
      .string()
      .refine((val) => isDate(val), { message: 'Invalid end date' })
      .optional()
      .or(z.literal('')),
  });

export const addNewDriverTransformer = (data: AddNewDriverSchema) => (
  mapValues(data, (val) => {
    if (!val) return undefined;
    if (val instanceof FileList) return val[0] as File | undefined;
    return val;
  }) as AddNewDriverTransformedSchema
);

export type AddNewDriverDetailsSchema = z.infer<typeof addNewDriverDetailsSchema>;
export type AddNewDriversLicenceSchema = z.infer<typeof addNewDriversLicenceSchema>;
export type AddNewDriverTaxiBadgeSchema = z.infer<typeof addNewDriverTaxiBadgeSchema>;
export type AddNewDriverSchema = z.infer<typeof addNewDriverSchema>;

export type AddNewDriverTransformedSchema = MergeOverwrite<AddNewDriverSchema, {
  picture?: File | undefined;
  licence_document?: File | undefined;
  badge_document?: File | undefined;
}>;
