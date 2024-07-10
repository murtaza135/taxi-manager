create view driver_view as
  select
    driver.auth_id,
    driver.id,
    driver.first_names,
    driver.last_name,
    driver.phone_number,
    driver.email,
    driver.picture_path,
    driver.active_hire_agreement_id,
    driver.created_at,
    hire_agreement.taxi_id,
    taxi.number_plate
  from
    driver
    left join hire_agreement on driver.active_hire_agreement_id = hire_agreement.id
    left join taxi on hire_agreement.taxi_id = taxi.id;