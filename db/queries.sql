-- ****************************
--Queries from module
-- ****************************

-- returns all columns from both tables
SELECT * FROM employee
LEFT JOIN role ON employee.role_id = role.id;

-- returns all employee data and only role name
SELECT employee.*, role.title
FROM employee
LEFT JOIN role ON employee.role_id = role.id;

-- same as above but defines alias "role_title" rather than simply "title"
SELECT employee.*, role.title AS role_title
FROM employee
LEFT JOIN role ON employee.role_id = role.id;

-- ****************************
--Queries for project
-- ****************************

-- view all departments
SELECT * FROM department;

-- view all roles 

-- view all employees

-- add a department
INSERT INTO department (name)
VALUES (?)

-- add a role
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?)

-- add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?)

-- update an employee
UPDATE employee SET role = ?
WHERE id = ?