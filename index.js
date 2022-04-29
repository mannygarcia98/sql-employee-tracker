const db = require("./db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");

db.connect((err) => {
  if (err) throw err;
  // console.log("Database connected.");
});

// const promptUser = () => {
//   return inquirer.prompt([
//     {
//       type: "list",
//       name: "action",
//       message: "What would you like to do?",
//       choices: ["View all departments", "View all roles", "View all employees"],
//     },
//   ]);
// };

const prompts = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees"],
    },
  ]);
};

// view all departments
const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(`
    All departments
    `);
    console.table(rows);
    promptUser();
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
      promptUser();
    }
  );
};

const viewAllEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
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
      promptUser();
    }
  );
};

// promptUser()
//   .then((action) => {
//     const { choice } = action;
//     if (choice = "View all departments")
//   })

// promptUser().then((response) => {
//   const { action } = response;
//   if (action === "View all departments") {
//     viewAllDepartments();
//   } else if (action === "View all roles") {
//     viewAllRoles();
//   } else {
//     viewAllEmployees();
//   }
//   promptUser();
//   // console.log(action);
// });

const promptUser = () => {
  prompts().then((response) => {
    const { action } = response;
    if (action === "View all departments") {
      viewAllDepartments();
    } else if (action === "View all roles") {
      viewAllRoles();
    } else {
      viewAllEmployees();
    }
  });
};

promptUser();
