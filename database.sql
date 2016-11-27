CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) UNIQUE NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  employeeID VARCHAR(100) NOT NULL,
  jobTitle VARCHAR(200),
  annualSalary VARCHAR

);

INSERT INTO employees (firstName, lastName, employeeID, jobTitle, annualSalary)
VALUES ('phil', 'gebauer', '23', 'worker', '234');
