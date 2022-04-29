const db = require("./db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");
const query = require("./db/queries");

db.connect((err) => {
  if (err) throw err;
  // console.log("Database connected.");
});

const prompts = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department"],
    },
  ]);
};

// view all departments
// const viewAllDepartments = () => {
//   let sql = `SELECT * FROM department`;
//   db.query(sql, (err, rows) => {
//     // console.log(`
//     // All departments
//     // `);
//     console.table(rows);
//     promptUser();
//   });
// };

const viewAllDepartments = () => {
  let sql = query.viewAllDepartments;
  db.query(sql, (err, rows) => {
    console.table(rows);
    promptUser();
  });
};

// view all roles
const viewAllRoles = () => {
  let sql = query.viewAllRoles;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    promptUser();
  });
};

const viewAllEmployees = () => {
  let sql = query.viewAllEmployees;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    promptUser();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of the department?",
        validate: (departmentInput) => {
          if (departmentInput) {
            return true;
          } else {
            console.log("Please enter the name of the department.");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      let sql = query.addDepartment;
      db.query(sql, answer.newDepartment, (error, response) => {
        if (error) throw error;
        console.log(`${answer.newDepartment} department added.`);
        promptUser();
      });
    });
};

const promptUser = () => {
  prompts().then((choice) => {
    const { action } = choice;
    if (action === "View all departments") {
      viewAllDepartments();
    }
    if (action === "View all roles") {
      viewAllRoles();
    }
    if (action === "View all employees") {
      viewAllEmployees();
    }
    if (action === "Add a department") {
      addDepartment();
    }
  });
};

promptUser();
