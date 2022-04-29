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

-- view all roles (id, title, dpt_name, salary)
SELECT role.id, title, department.name AS department_name, salary
FROM role
LEFT JOIN department ON role.department_id = department.id;

-- view all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;

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