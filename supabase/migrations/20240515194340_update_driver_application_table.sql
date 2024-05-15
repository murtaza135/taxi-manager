alter table "public"."driver_application" alter column "drivers_licence_end_date" drop not null;

alter table "public"."driver_application" alter column "drivers_licence_number" drop not null;

alter table "public"."driver_application" alter column "drivers_licence_start_date" drop not null;

alter table "public"."driver_application" alter column "taxi_badge_end_date" drop not null;

alter table "public"."driver_application" alter column "taxi_badge_number" drop not null;

alter table "public"."driver_application" alter column "taxi_badge_start_date" drop not null;


