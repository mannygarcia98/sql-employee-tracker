const db = require("./db/connection");
const cTable = require("console.table");
// db.connect();

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});

// view all departments
const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(`
    All departments
    `);
    console.table(rows);
  });
};

// view all roles
const viewAllRoles = () => {
  db.query(
    `SELECT role.id, title, department.name AS department_name, salary
      FROM role
      LEFT JOIN department ON role.department_id = department.id;`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(`
      All roles
      `);
      console.table(rows);
    }
  );
};

const viewAllEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS 'role', department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department department on role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id;`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(`
    All employees
    `);
      console.table(rows);
    }
  );
};
