CREATE FUNCTION add_new_hire_agreement (
  taxi_id bigint,
  driver_id bigint,
  rent_amount numeric(12,2),
  deposit_amount numeric(12,2),
  start_date date,
  end_date date default null,
  permission_letter_document_path text default null,
  contract_document_path text default null,
  deposit_receipt_document_path text default null
) RETURNS bigint AS $$
DECLARE
    hire_id bigint;
BEGIN
    -- Insert data into taxi table
    INSERT INTO hire_agreement (taxi_id, driver_id, start_date, end_date, rent_amount, deposit_amount, permission_letter_document_path, contract_document_path, deposit_receipt_document_path)
    VALUES (taxi_id, driver_id, start_date, end_date, rent_amount, deposit_amount, permission_letter_document_path, contract_document_path, deposit_receipt_document_path)
    RETURNING id INTO hire_id;

    -- Update hire agreement of taxi
    UPDATE taxi
    SET active_hire_agreement_id = hire_id
    WHERE id = driver_id
    AND auth_id = auth.uid();

    -- Update hire agreement of driver
    UPDATE driver
    SET active_hire_agreement_id = hire_id
    WHERE id = taxi_id
    AND auth_id = auth.uid();

    RETURN hire_id;
END;
$$ LANGUAGE plpgsql;
