import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPE = /image\/.+/;
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const addNewDriverDetailsSchema = z.object({
  first_names: z.string().length(1, 'First name required'),
  last_name: z.string().length(1, 'Last name required'),
  phone_number: z.string().refine((val) => isMobilePhone(val), 'Invalid phone number').optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  date_of_birth: z.date({ invalid_type_error: 'Invalid date of birth' }).optional(),
  national_insurance_number: z.string().length(1, 'Invalid national insurance number').optional(),
  picture: z.instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => !!file.type.match(ACCEPTED_IMAGE_MIME_TYPE), 'File must be an image')
    .optional(),
});

export const addNewDriversLicenceSchema = z.object({
  licence_number: z.string().length(1, 'Licence number required'),
  licence_start_date: z.date({ required_error: 'Start date required', invalid_type_error: 'Invalid start date' }),
  licence_end_date: z.date({ required_error: 'End date required', invalid_type_error: 'Invalid end date' }),
  licence_document: z.instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => !!file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'File must be an image or a PDF')
    .optional(),
});

export const addNewDriverTaxiBadgeSchema = z.object({
  badge_number: z.string().length(1, 'Taxi badge number required'),
  badge_start_date: z.date({ invalid_type_error: 'Invalid start date' }).optional(),
  badge_end_date: z.date({ required_error: 'End date required', invalid_type_error: 'Invalid end date' }),
  badge_document: z.instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => !!file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'File must be an image or a PDF')
    .optional(),
});

export const addNewDriverSchema = addNewDriverDetailsSchema
  .merge(addNewDriversLicenceSchema)
  .merge(addNewDriverTaxiBadgeSchema);

export type AddNewDriverDetailsSchema = z.infer<typeof addNewDriverDetailsSchema>;
export type AddNewDriversLicenceSchema = z.infer<typeof addNewDriversLicenceSchema>;
export type AddNewDriverTaxiBadgeSchema = z.infer<typeof addNewDriverTaxiBadgeSchema>;
export type AddNewDriverSchema = z.infer<typeof addNewDriverSchema>;
