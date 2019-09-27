# DROP DATABASE adcemdb;
# CREATE DATABASE adcemdb;
# USE adcemdb;

# CREATE TABLE customers (
# 	id INT AUTO_INCREMENT PRIMARY KEY,
# 	hospital_name VARCHAR(255) NOT NULL,
# 	hospital_addr VARCHAR(255),
# 	region VARCHAR(255),
# 	phone INT,
# 	created_at TIMESTAMP DEFAULT NOW()
# );


# CREATE TABLE machines (
# 	serial_no VARCHAR(255) NOT NULL PRIMARY KEY,
# 	device_type VARCHAR(255) NOT NULL,
# 	ec INT,
# 	installation_date DATE,
# 	warranty_end DATE,
# 	ppm_date DATE,
# 	operating_hours INT,
# 	machine_status VARCHAR(255),
# 	customer_id INT NOT NULL,
# 	FOREIGN KEY(customer_id) REFERENCES customers(id)
# );

CREATE TABLE reports(
	id INT AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(255) NOT NULL,
	service_report_no INT,
	report_date DATE,
	machine_hours INT,
	engineer_name VARCHAR(255),
	error_codes INT,
	extra_notes VARCHAR(255),
	request_status VARCHAR(255),
	customer_id INT NOT NULL,
	machine_id VARCHAR(255) NOT NULL,
	FOREIGN KEY(customer_id) REFERENCES customers(id),
	FOREIGN KEY(machine_id) REFERENCES machines(serial_no)
);