import { Title } from '@/features/title/components/Title';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';

export function HiresPage() {
  return (
    <>
      <Title title="Hires" />
      <div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="password2">Password</TabsTrigger>
            <TabsTrigger value="password3">Password</TabsTrigger>
            <TabsTrigger value="password4">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
}
