import { useSearchParams } from 'react-router-dom';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  useZodForm,
} from '@/ui/form/Form';
import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { loginFormSchema } from '@/features/auth/schemas';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useAnonymousLogin } from '@/features/auth/hooks/useAnonymousLogin';
import { LoginFormGroup } from '@/features/auth/login/LoginFormGroup';

export function LoginForm() {
  const form = useZodForm({
    schema: loginFormSchema,
    defaultValues: { email: '', password: '' },
  });
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { mutate: login } = useLogin({ redirect });
  const { mutate: anonymousLogin } = useAnonymousLogin({ redirect });

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={form.handleSubmit((data) => login(data))}
        className="w-full max-w-[24rem] space-y-4 bg-primary-dark text-achromatic-lighter"
      >
        <FormTitle>Login</FormTitle>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <LoginFormGroup label="Email">
              <Input
                placeholder="Email"
                className="border-achromatic-lighter bg-primary-dark [&>input]:placeholder:text-achromatic-lighter/70"
                {...field}
              />
            </LoginFormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <LoginFormGroup label="Password">
              <Input
                placeholder="Password"
                type="password"
                className="border-achromatic-lighter bg-primary-dark [&>input]:placeholder:text-achromatic-lighter/70"
                {...field}
              />
            </LoginFormGroup>
          )}
        />

        <div className="pt-3">
          <Button type="submit" variant="base" className="w-full">Login</Button>
        </div>

        <Button
          type="button"
          className="w-full inline-block text-achromatic-lighter/70 dark:text-achromatic-500"
          variant="ghost"
          onClick={() => anonymousLogin()}
        >
          Continue as Guest
        </Button>
      </Form>
    </FormProvider>
  );
}
