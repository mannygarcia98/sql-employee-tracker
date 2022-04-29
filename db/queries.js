let viewAllDepartments = `SELECT * FROM department`;

let viewAllRoles = `SELECT role.id, title, department.name AS department_name, salary
FROM role
LEFT JOIN department ON role.department_id = department.id;`;

let viewAllEmployees = `SELECT employee.id, employee.       first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
FROM employee LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department department on role.department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id;`;

let addDepartment = `INSERT INTO department (name) VALUES (?)`;
module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment };
