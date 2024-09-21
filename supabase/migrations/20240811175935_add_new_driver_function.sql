CREATE FUNCTION add_new_driver (
  name text,
  licence_number text default null,
  licence_start_date date default null,
  licence_end_date date default null,
  badge_number text default null,
  badge_end_date date default null,
  picture_path text default null,
  phone_number text default null,
  email text default null,
  date_of_birth date default null,
  national_insurance_number text default null,
  licence_document_path text default null,
  licence_document2_path text default null,
  badge_document_path text default null,
  badge_document2_path text default null,
  badge_start_date date default null
) RETURNS bigint AS $$
DECLARE
    driver_id bigint;
    licence_id bigint;
    badge_id bigint;
BEGIN
    -- Insert data into driver table
    INSERT INTO driver (name, phone_number, email, date_of_birth, national_insurance_number, picture_path)
    VALUES (name, phone_number, email, date_of_birth, national_insurance_number, picture_path)
    RETURNING id INTO driver_id;

    -- Insert data into drivers_licence table
    IF licence_number IS NOT NULL THEN
      INSERT INTO drivers_licence (driver_id, document_path, document2_path, licence_number, start_date, end_date)
      VALUES (driver_id, licence_document_path, licence_document2_path, licence_number, licence_start_date, licence_end_date)
      RETURNING id INTO licence_id;
    END IF;

    -- Insert data into taxi_badge table
    IF badge_number IS NOT NULL THEN
      INSERT INTO drivers_taxi_badge (driver_id, document_path, document2_path, badge_number, start_date, end_date)
      VALUES (driver_id, badge_document_path, badge_document2_path, badge_number, badge_start_date, badge_end_date)
      RETURNING id INTO badge_id;
    END IF;

    -- Update driver, add the active drivers_licence and taxi_badge
    UPDATE driver
    SET
      active_drivers_licence_id = licence_id,
      active_drivers_taxi_badge_id = badge_id
    WHERE id = driver_id;

    RETURN driver_id;
END;
$$ LANGUAGE plpgsql;
