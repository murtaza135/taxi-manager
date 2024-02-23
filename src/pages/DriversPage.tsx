import { useEffect } from 'react';
import { Title } from '@/features/title/components/Title';
import { Spinner } from '@/ui/Spinner';
import { Skeleton } from '@/ui/Skeleton';
import { useToast, ToastAction } from '@/ui/toast';
import { TooltipWrapper } from '@/ui/Tooltip';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/Dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerBody,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/Drawer';
import { Button } from '@/ui/Button';

export default function DriversPage() {
  const { toast } = useToast();

  // useEffect(() => {
  //   toast({
  //     title: 'Scheduled: Catch up',
  //     description: 'Friday, February 10, 2023 at 5:57 PM',
  //     variant: 'destructive',
  //     action: <ToastAction altText="Try again">Try again</ToastAction>,
  //   });
  // }, [toast]);

  return (
    <div className="center">
      <Title title="Drivers" />
      {/* <Spinner className="w-20 h-20" /> */}
      {/* <div className="flex gap-4 items-center">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div> */}
      {/* <TooltipWrapper text="lol">
        <p>Hover</p>
      </TooltipWrapper> */}
      {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis quis voluptas dignissimos, unde, ad repellat provident commodi dolores consectetur a odit accusamus cupiditate aliquam placeat? Ut nostrum, vel porro cupiditate perspiciatis officiis, ea, consequuntur at esse quia laboriosam ducimus. Voluptas, molestiae ratione rem praesentium fugit, dolore illum provident suscipit expedita, culpa reiciendis. Minus in doloribus quibusdam culpa eaque quis blanditiis ab vero aliquid ipsum praesentium, commodi porro aut vitae. Magnam commodi incidunt magni tempore doloribus assumenda neque sapiente labore necessitatibus id, quos maiores, libero dignissimos natus quasi dolor ipsam, non amet delectus totam velit. Ipsum fugiat accusantium, illo, sit sint voluptatem labore hic temporibus deserunt unde consequatur deleniti laudantium minus saepe! Esse quasi error recusandae ducimus, possimus dicta, deleniti iusto provident dignissimos illo nihil non, totam ab? Enim eligendi veritatis quod totam sint nemo officia, molestias nihil recusandae ipsam aliquam quas qui cupiditate iusto magni. Sed, facilis fuga. Veritatis tempore magnam distinctio voluptas quis sequi, soluta commodi odit optio perspiciatis, odio est sapiente non officiis. Dolor totam quam, voluptatum vitae tempore possimus repudiandae deleniti voluptatem ipsam amet impedit eum dolorum culpa ipsa neque fugiat quo natus velit voluptate ex nisi porro quae architecto cupiditate? Fuga nam laudantium fugit repellat cum quasi quas eius ratione eaque magni corrupti quaerat aut nemo, qui adipisci consequatur quae magnam nobis. Libero eligendi, deserunt labore tempore voluptas assumenda delectus inventore odit, dolorem maiores reiciendis? Fugit porro voluptatum at adipisci officiis quia tenetur saepe libero vitae accusantium dolores dolore tempora ducimus soluta architecto cumque veritatis dicta necessitatibus, maxime ullam? Tempora dolorem dolores quibusdam culpa ab eum vitae consectetur iusto consequuntur ea quae, non voluptatibus tenetur voluptate obcaecati! Minus nemo recusandae consequuntur porro, at quaerat impedit eum obcaecati. Facilis ad neque voluptatem fugit culpa temporibus quibusdam. Sequi vitae aut in assumenda nihil atque accusamus omnis! Perspiciatis debitis perferendis libero ad rem, expedita quo iste ratione nemo est iusto eveniet a. Ducimus inventore, iure, aut eveniet praesentium voluptatum vel tenetur assumenda sequi architecto earum error facere ratione! Quos animi optio aperiam illo, nisi recusandae neque sit tempora consequuntur minima cumque, repudiandae quibusdam iure architecto, dignissimos quis dolorum quas vitae libero quaerat iusto? Quasi porro inventore tempora nostrum, ducimus praesentium velit id explicabo dicta accusamus suscipit iusto rerum non qui amet? Debitis, amet? Illum quod ipsam iure, minima quam quia repudiandae culpa suscipit fugiat corporis facilis natus! Molestias eligendi placeat, nemo nostrum architecto molestiae nam obcaecati, sunt aliquam eos expedita distinctio ipsam error sint voluptas veritatis? Similique eaque distinctio doloribus earum beatae cum itaque quidem repellendus provident et amet, tempora aliquid in repudiandae inventore molestias officiis ducimus eius ipsum laborum ratione. Eos saepe alias fuga, quae iusto dignissimos ipsa hic culpa ipsum praesentium quia a architecto voluptatem facere! Sed minus sapiente earum illo harum ex voluptatum deleniti perspiciatis aperiam magnam doloremque totam alias a tempore rem ducimus aliquam similique dignissimos quos qui, error nisi. Ipsam voluptates quo rem doloremque iure voluptatum, asperiores, quos, unde iste expedita optio quis dolorum nobis odio nesciunt deleniti sint illum praesentium laboriosam harum excepturi.</p> */}
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="max-w-60">
            <Button className="w-full">Submit</Button>
            <DrawerClose className="w-full transition-opacity hover:opacity-70 bg-achromatic-300 dark:bg-achromatic-700 rounded-lg py-1.5 px-3">
              Cancel
            </DrawerClose>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
    </div>
  );
}
