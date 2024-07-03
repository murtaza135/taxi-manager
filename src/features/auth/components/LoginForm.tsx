import { useSearchParams } from 'react-router-dom';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  useZodForm,
} from '@/ui/Form';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { loginFormSchema } from '@/features/auth/schemas';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useAnonymousLogin } from '@/features/auth/hooks/useAnonymousLogin';
import { LoginFormGroup } from '@/features/auth/components/LoginFormGroup';

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
        className="w-full max-w-[24rem] space-y-4 bg-primary-dark text-achromatic-light"
      >
        <FormTitle>Login</FormTitle>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <LoginFormGroup label="Email">
              <Input
                placeholder="Email"
                className="border-achromatic-light bg-primary-dark [&>input]:placeholder:text-achromatic-light/70"
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
                className="border-achromatic-light bg-primary-dark [&>input]:placeholder:text-achromatic-light/70"
                {...field}
              />
            </LoginFormGroup>
          )}
        />

        <div className="pt-3">
          <Button type="submit" variant="base" className="w-full">Login</Button>
        </div>

        <div className="pt-1">
          <Button
            type="button"
            className="w-full inline-block"
            variant="ghost"
            onClick={() => anonymousLogin()}
          >
            <span className="text-achromatic-light/70 dark:text-achromatic-500">
              Don&apos;t have an account?
            </span>
            &nbsp;
            GUEST LOGIN
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}
