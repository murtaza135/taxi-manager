alter table "public"."driver_application" add column "auth_id" uuid not null default auth.uid();

alter table "public"."driver_application" add constraint "driver_application_auth_id_fkey" FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."driver_application" validate constraint "driver_application_auth_id_fkey";


