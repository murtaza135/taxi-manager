import { z } from 'zod';
import { isStrongPassword } from '@/utils/string/isStrongPassword';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().refine(
    (val) => isStrongPassword(val),
    { message: 'Must contain minimum 8 characters and at least 1 lowercase, 1 uppercase and 1 digit' },
  ),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
