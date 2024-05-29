import { z } from 'zod';
import isStrongPassword from 'validator/es/lib/isStrongPassword';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().refine(
    (val) => isStrongPassword(val, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    }),
    { message: 'Password must have at least 8 characters and contain at least one lowercase, one uppercase character and one digit' },
  ),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
