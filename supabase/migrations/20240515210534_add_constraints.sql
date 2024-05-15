ALTER TABLE public.driver_application
ADD CHECK (drivers_licence_end_date > drivers_licence_start_date);

ALTER TABLE public.driver_application
ADD CHECK (taxi_badge_end_date > taxi_badge_start_date);

ALTER TABLE public.drivers_licence
ADD CHECK (end_date > start_date);

ALTER TABLE public.drivers_taxi_badge
ADD CHECK (end_date > start_date);

ALTER TABLE public.hire_agreement
ADD CHECK (end_date > start_date);

ALTER TABLE public.hire_agreement
ADD CHECK (rent_amount >= 0);

ALTER TABLE public.hire_agreement
ADD CHECK (deposit_amount >= 0);

ALTER TABLE public.insurance
ADD CHECK (end_date > start_date);

ALTER TABLE public.rent
ADD CHECK (end_date > start_date);

ALTER TABLE public.taxi
ADD CHECK (expected_expiry_date > registration_date);

ALTER TABLE public.taxi
ADD CHECK (road_tax_expiry_date > registration_date);

ALTER TABLE public.taxi_licence
ADD CHECK (end_date > start_date);

ALTER TABLE public.vehicle
ADD CHECK (cc > 0);
