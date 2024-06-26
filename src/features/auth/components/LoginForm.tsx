import { useSearchParams } from 'react-router-dom';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
} from '@/ui/Form';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { loginFormSchema } from '@/features/auth/schemas';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useAnonymousLogin } from '@/features/auth/hooks/useAnonymousLogin';

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
        className="w-full max-w-[24rem] space-y-4"
      >
        <FormTitle>Login</FormTitle>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormGroup label="Email">
              <Input placeholder="Email" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormGroup label="Password">
              <Input placeholder="Password" type="password" {...field} />
            </FormGroup>
          )}
        />

        <div className="pt-3">
          <Button type="submit" className="w-full">Login</Button>
        </div>

        <div className="pt-1">
          <Button
            type="button"
            className="w-full"
            variant="ghost"
            onClick={() => anonymousLogin()}
          >
            <span className="text-neutral-900/70 dark:text-achromatic-500">Don&apos;t have an account?</span>
            &nbsp;
            GUEST LOGIN
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}
