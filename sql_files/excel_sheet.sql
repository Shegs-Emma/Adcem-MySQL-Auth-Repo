# MACHINE DATA
# 1. HD MACHINES
# SELECT
# 	serial_no,
# 	device_type,
# 	hospital_name,
# 	ec,
# 	installation_date,
# 	warranty_end,
# 	ppm_date
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# WHERE device_type NOT IN ('AQUA WTU 250', 'AQUA B500', 'AQUA WTU 125', 'WTU250', 'AQUA B 500', 'AQUA B 250');

#2. WTU MACHINES
# SELECT
# 	serial_no,
# 	device_type,
# 	hospital_name,
# 	ec,
# 	installation_date,
# 	warranty_end,
# 	ppm_date
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# WHERE device_type IN ('AQUA WTU 250', 'AQUA B500', 'AQUA WTU 125', 'WTU250', 'AQUA B 500', 'AQUA B 250')
# ORDER BY hospital_name ASC;

#3. HOTLINE AND CUSTOMER REQUESTS
# SELECT 
# 	report_date,
# 	device_type,
# 	serial_no,
# 	hospital_name,
# 	description,
# 	extra_notes,
# 	request_status,
# 	machine_hours,
# 	service_report_no,
# 	engineer_name
# FROM customers
# INNER JOIN machines
# ON customers.id = machines.customer_id
# INNER JOIN reports
# ON machines.serial_no = reports.machine_id;



# SELECT 
# 	serial_no,
# 	ec,
# 	operating_hours,
# 	description,
# 	engineer_name,
# 	installation_date,
# 	extra_notes
# FROM machines
# INNER JOIN reports
# ON machines.serial_no = reports.machine_id
# WHERE machines.serial_no = '144S1226';

# SELECT DATE_FORMAT(installation_date, "%M, %d %Y.") FROM machines;

SELECT
	c.id,
	hospital_name,
	c.region,
	m.device_type,
	COUNT(device_type)
FROM customers c
INNER JOIN machines m
ON c.id = m.customer_id
GROUP BY hospital_name, device_type
ORDER BY c.id LIMIT 10;