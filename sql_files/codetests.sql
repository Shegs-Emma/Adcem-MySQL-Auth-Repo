# SELECT 
# 	hospital_name, 
# 	device_type,
# 	description
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# INNER JOIN reports
# ON machines.serial_no = reports.machine_id;

# SELECT
# 	customers.id,
# 	hospital_name,
# 	device_type,
# 	serial_no
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# WHERE machines.serial_no LIKE '%244S1451%';

# SELECT
# 	customers.id,
# 	hospital_name,
# 	device_type,
# 	serial_no,
# 	ec
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# WHERE customers.hospital_name LIKE '%VEDIC%';

# SELECT
# 	customers.id,
# 	hospital_name,
# 	device_type,
# 	serial_no,
# 	ec
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# WHERE customers.hospital_name LIKE '%ALIMOSHO%';



