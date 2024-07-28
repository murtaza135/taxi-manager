import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import isDate from 'validator/es/lib/isDate';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPE = /image\/.+/;
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const addNewDriverDetailsSchema = z.object({
  first_names: z
    .string({ required_error: 'First name required' })
    .min(1, 'First name required'),
  last_name: z
    .string({ required_error: 'Last name required' })
    .min(1, 'Last name required'),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  phone_number: z
    .string()
    .refine((val) => isMobilePhone(val), 'Invalid phone number')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  national_insurance_number: z
    .string()
    .min(1, 'Invalid national insurance number')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  date_of_birth: z
    .string()
    .refine((val) => isDate(val), { message: 'Invalid date of birth' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  picture: z.instanceof(FileList, { message: 'Allowed file types: images' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images' })
    .transform((fileList) => fileList[0] as File | undefined)
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => !file || !!file?.type?.match(ACCEPTED_IMAGE_MIME_TYPE), 'Allowed file types: images')
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
  licence_document: z.instanceof(FileList, { message: 'Allowed file types: images' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .transform((fileList) => fileList[0] as File | undefined)
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => !file || !!file?.type?.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
});

export const addNewDriverTaxiBadgeSchema = z.object({
  badge_number: z
    .string({ required_error: 'Taxi badge number required' })
    .min(1, 'Taxi badge number required'),
  badge_start_date: z
    .string()
    .refine((val) => isDate(val), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  badge_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isDate(val), { message: 'Invalid end date' }),
  badge_document: z.instanceof(FileList, { message: 'Allowed file types: images' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .transform((fileList) => fileList[0] as File | undefined)
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => !file || !!file?.type?.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
});

export const addNewDriverSchema = addNewDriverDetailsSchema
  .merge(addNewDriversLicenceSchema)
  .merge(addNewDriverTaxiBadgeSchema);

export type AddNewDriverDetailsSchema = z.infer<typeof addNewDriverDetailsSchema>;
export type AddNewDriversLicenceSchema = z.infer<typeof addNewDriversLicenceSchema>;
export type AddNewDriverTaxiBadgeSchema = z.infer<typeof addNewDriverTaxiBadgeSchema>;
export type AddNewDriverSchema = z.infer<typeof addNewDriverSchema>;
