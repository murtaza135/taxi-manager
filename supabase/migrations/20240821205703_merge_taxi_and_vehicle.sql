alter table public.taxi add make text not null;
alter table public.taxi add model text not null;
alter table public.taxi add cc smallint null;
alter table public.taxi add fuel_type text null;

drop view public.taxi_view;

create view
  public.taxi_view as
select
  taxi.id,
  taxi.auth_id,
  taxi.picture_path,
  taxi.logbook_document_path,
  taxi.logbook_document2_path,
  taxi.number_plate,
  taxi.colour,
  taxi.chassis_number,
  taxi.registration_date,
  taxi.expected_expiry_date,
  taxi.road_tax_expiry_date,
  taxi.is_retired,
  taxi.make,
  taxi.model,
  taxi.cc,
  taxi.fuel_type,
  taxi.created_at,
  hire_agreement.id as hire_agreement_id,
  driver.id as driver_id,
  driver.name as driver_name,
  taxi_licence.id as taxi_licence_id,
  taxi_licence.compliance_certificate_document_path,
  taxi_licence.compliance_certificate_licence_number,
  taxi_licence.phc_licence_document_path,
  taxi_licence.phc_number,
  taxi_licence.start_date as taxi_licence_start_date,
  taxi_licence.end_date as taxi_licence_end_date,
  insurance.id as insurance_id,
  insurance.document_path as insurance_document_path,
  insurance.policy_number as insurance_policy_number,
  insurance.is_any_driver as insurance_is_any_driver,
  insurance.start_date as insurance_start_date,
  insurance.end_date as insurance_end_date
from
  taxi
  left join hire_agreement on taxi.active_hire_agreement_id = hire_agreement.id
  left join driver on hire_agreement.driver_id = driver.id
  left join taxi_licence on taxi.active_taxi_licence_id = taxi_licence.id
  left join insurance on taxi.active_insurance_id = insurance.id;

alter table public.taxi drop constraint taxi_vehicle_id_fkey;
alter table public.taxi drop column vehicle_id;

drop table public.vehicle;