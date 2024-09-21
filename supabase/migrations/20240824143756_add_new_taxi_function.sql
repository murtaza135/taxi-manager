CREATE FUNCTION add_new_taxi (
  number_plate text,
  make text,
  model text,
  colour text,
  chassis_number text,
  registration_date date default null,
  expected_expiry_date date default null,
  road_tax_expiry_date date default null,
  cc smallint default null,
  fuel_type text default null,
  picture_path text default null,
  logbook_document_path text default null,
  logbook_document2_path text default null,
  compliance_certificate_licence_number text default null,
  phc_number text default null,
  taxi_licence_start_date date default null,
  taxi_licence_end_date date default null,
  compliance_certificate_document_path text default null,
  phc_licence_document_path text default null,
  policy_number text default null,
  is_any_driver boolean default null,
  insurance_start_date date default null,
  insurance_end_date date default null,
  insurance_document_path text default null
) RETURNS bigint AS $$
DECLARE
    taxi_id bigint;
    taxi_licence_id bigint;
    insurance_id bigint;
BEGIN
    -- Insert data into taxi table
    INSERT INTO taxi (number_plate, make, model, colour, chassis_number, registration_date, expected_expiry_date, road_tax_expiry_date, cc, fuel_type, picture_path, logbook_document_path, logbook_document2_path)
    VALUES (number_plate, make, model, colour, chassis_number, registration_date, expected_expiry_date, road_tax_expiry_date, cc, fuel_type, picture_path, logbook_document_path, logbook_document2_path)
    RETURNING id INTO taxi_id;

    -- Insert data into taxi_licence table
    IF compliance_certificate_licence_number IS NOT NULL AND phc_number IS NOT NULL THEN
      INSERT INTO taxi_licence (taxi_id, compliance_certificate_document_path, compliance_certificate_licence_number, phc_licence_document_path, phc_number, start_date, end_date)
      VALUES (taxi_id, compliance_certificate_document_path, compliance_certificate_licence_number, phc_licence_document_path, phc_number, taxi_licence_start_date, taxi_licence_end_date)
      RETURNING id INTO taxi_licence_id;
    END IF;

    -- Insert data into insurance table
    IF policy_number IS NOT NULL THEN
      INSERT INTO insurance (taxi_id, document_path, policy_number, is_any_driver, start_date, end_date)
      VALUES (taxi_id, insurance_document_path, policy_number, is_any_driver, insurance_start_date, insurance_end_date)
      RETURNING id INTO insurance_id;
    END IF;

    -- Update taxi, add the active taxi_licence and insurance
    UPDATE taxi
    SET
      active_taxi_licence_id = taxi_licence_id,
      active_insurance_id = insurance_id
    WHERE id = taxi_id;

    RETURN taxi_id;
END;
$$ LANGUAGE plpgsql;
