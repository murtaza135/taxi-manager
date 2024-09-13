create view rent_view as
  select
    rent.id,
    rent.auth_id,
    rent.receipt_document_path,
    rent.start_date,
    rent.end_date,
    rent.amount,
    rent.is_paid,
    rent.paid_date,
    rent.created_at,
    driver.id as driver_id,
    driver.name as driver_name,
    taxi.id as taxi_id,
    taxi.number_plate,
    taxi_licence.phc_number,
    hire_agreement.id as hire_agreement_id
  from
    rent
    left join hire_agreement on rent.hire_id = hire_agreement.id
    left join driver on hire_agreement.driver_id = driver.id
    left join taxi on hire_agreement.taxi_id = taxi.id
    left join taxi_licence on taxi.active_taxi_licence_id = taxi_licence.id;