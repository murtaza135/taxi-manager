drop view driver_view;

create view driver_view as
  select
    driver.id,
    driver.auth_id,
    driver.picture_path,
    CONCAT(driver.first_names, ' ', driver.last_name) AS name,
    driver.phone_number,
    driver.email,
    driver.date_of_birth,
    driver.national_insurance_number,
    driver.is_retired,
    driver.created_at,
    hire_agreement.id as hire_agreement_id,
    taxi.id as taxi_id,
    taxi.number_plate,
    drivers_licence.id as drivers_licence_id,
    drivers_licence.document_path as drivers_licence_document_path,
    drivers_licence.licence_number,
    drivers_licence.start_date as drivers_licence_start_date,
    drivers_licence.end_date as drivers_licence_end_date,
    drivers_taxi_badge.id as drivers_taxi_badge_id,
    drivers_taxi_badge.document_path as drivers_taxi_badge_document_path,
    drivers_taxi_badge.badge_number,
    drivers_taxi_badge.start_date as drivers_taxi_badge_start_date,
    drivers_taxi_badge.end_date as drivers_taxi_badge_end_date,
    insurance.id as insurance_id,
    insurance.document_path as insurance_document_path,
    insurance.policy_number,
    insurance.start_date as insurance_start_date,
    insurance.end_date as insurance_end_date
  from
    driver
    left join hire_agreement on driver.active_hire_agreement_id = hire_agreement.id
    left join taxi on hire_agreement.taxi_id = taxi.id
    left join drivers_licence on driver.active_drivers_licence_id = drivers_licence.id
    left join drivers_taxi_badge on driver.active_drivers_taxi_badge_id = drivers_taxi_badge.id
    left join insurance on driver.active_insurance_id = insurance.id;

create view taxi_view as
  select
    taxi.id,
    taxi.auth_id,
    taxi.picture_path,
    taxi.logbook_document_path,
    taxi.number_plate,
    taxi.colour,
    taxi.chassis_number,
    taxi.registration_date,
    taxi.expected_expiry_date,
    taxi.road_tax_expiry_date,
    taxi.is_retired,
    taxi.created_at,
    hire_agreement.id as hire_agreement_id,
    driver.id as driver_id,
    CONCAT(driver.first_names, ' ', driver.last_name) AS driver_name,
    vehicle.id as vehicle_id,
    vehicle.make,
    vehicle.model,
    vehicle.cc,
    vehicle.fuel_type,
    taxi_licence.id as taxi_licence_id,
    taxi_licence.compliance_certificate_document_path,
    taxi_licence.compliance_certificate_licence_number,
    taxi_licence.phc_licence_document_path,
    taxi_licence.phc_number,
    taxi_licence.start_date as taxi_licence_start_date,
    taxi_licence.end_date as taxi_licence_end_date,
    insurance.id as insurance_id,
    insurance.document_path as insurance_document_path,
    insurance.policy_number,
    insurance.is_any_driver,
    insurance.start_date as insurance_start_date,
    insurance.end_date as insurance_end_date
  from
    taxi
    left join hire_agreement on taxi.active_hire_agreement_id = hire_agreement.id
    left join driver on hire_agreement.driver_id = driver.id
    left join vehicle on taxi.vehicle_id = vehicle.id
    left join taxi_licence on taxi.active_taxi_licence_id = taxi_licence.id
    left join insurance on taxi.active_insurance_id = insurance.id;

create view hire_agreement_view as
  select
    hire_agreement.id,
    hire_agreement.auth_id,
    hire_agreement.permission_letter_document_path,
    hire_agreement.contract_document_path,
    hire_agreement.start_date,
    hire_agreement.end_date,
    hire_agreement.rent_amount,
    hire_agreement.deposit_amount,
    hire_agreement.deposit_receipt_document_path,
    hire_agreement.is_retired,
    hire_agreement.created_at,
    driver.id as driver_id,
    CONCAT(driver.first_names, ' ', driver.last_name) AS driver_name,
    taxi.id as taxi_id,
    taxi.number_plate
  from
    hire_agreement
    left join driver on hire_agreement.driver_id = driver.id
    left join taxi on hire_agreement.taxi_id = taxi.id;
