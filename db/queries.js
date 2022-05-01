let allDepartments = `SELECT * FROM department`;

let allRoles = `SELECT role.id, title, department.name AS department_name, salary
FROM role
LEFT JOIN department ON role.department_id = department.id;`;

let roles = `SELECT * FROM role`;

let allEmployees = `SELECT employee.id, employee.       first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
FROM employee LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department department on role.department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id;`;

let addDepartment = `INSERT INTO department (name) VALUES (?)`;

// let departmentNames = `SELECT name FROM department`;

let addRole = `INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?)`;

let addEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?)`;

module.exports = { allDepartments, allRoles, allEmployees, addDepartment, addRole, roles, addEmployee };
