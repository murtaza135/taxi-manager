create view driver_view as
  select
    driver.id,
    driver.auth_id,
    driver.picture_path,
    driver.name,
    driver.phone_number,
    driver.email,
    driver.date_of_birth,
    driver.national_insurance_number,
    driver.is_retired,
    driver.active_insurance_id as insurance_id,
    driver.active_drivers_licence_id as drivers_licence_id,
    driver.active_drivers_taxi_badge_id as drivers_taxi_badge_id,
    driver.created_at,
    taxi.id as taxi_id,
    taxi.picture_path as taxi_picture_path,
    taxi.logbook_document_path,
    taxi.logbook_document2_path,
    taxi.number_plate,
    taxi.colour,
    taxi.chassis_number,
    taxi.registration_date,
    taxi.expected_expiry_date,
    taxi.road_tax_expiry_date,
    taxi.vehicle_id,
    taxi.active_taxi_licence_id as taxi_licence_id,
    hire_agreement.id as hire_agreement_id,
    hire_agreement.permission_letter_document_path,
    hire_agreement.contract_document_path,
    hire_agreement.start_date as hire_start_date,
    hire_agreement.end_date as hire_end_date,
    hire_agreement.rent_amount,
    hire_agreement.deposit_amount,
    hire_agreement.deposit_receipt_document_path
  from
    driver
    left join hire_agreement on driver.active_hire_agreement_id = hire_agreement.id
    left join taxi on hire_agreement.taxi_id = taxi.id;