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

export function LoginForm() {
  const form = useZodForm({
    schema: loginFormSchema,
    defaultValues: { email: '', password: '' },
  });
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { mutate, isPending } = useLogin({ successRedirect: redirect });

  const onSubmit = form.handleSubmit((data) => {
    if (!isPending) mutate(data);
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit} className="w-full max-w-[24rem] space-y-4">
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
      </Form>
    </FormProvider>
  );
}
