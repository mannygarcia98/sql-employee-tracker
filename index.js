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
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role"],
    },
  ]);
};

const viewAllDepartments = () => {
  let sql = query.allDepartments;
  db.query(sql, (err, rows) => {
    console.table(rows);
    promptUser();
  });
};

const viewAllRoles = () => {
  let sql = query.allRoles;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    promptUser();
  });
};

const viewAllEmployees = () => {
  let sql = query.allEmployees;
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

// add a role
const addRole = () => {
  // retrieve all departments
  let sql = query.allDepartments;
  db.query(sql, (error, response) => {
    let departmentArray = [];
    response.forEach((department) => {
      departmentArray.push(department.name);
    });
    inquirer
      .prompt([
        {
          name: "roleName",
          type: "input",
          message: "What is the name of the role?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the name of the role.");
              return false;
            }
          },
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the salary of the role?",
          validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            } else {
              console.log("Please enter the salary of the role.");
              return false;
            }
          },
        },
        {
          name: "roleDepartment",
          type: "list",
          message: "Which department does the role belong to?",
          choices: departmentArray,
        },
      ])
      .then((newRoleData) => {
        const { roleName, roleSalary, roleDepartment } = newRoleData;
        let departmentId;

        response.forEach((department) => {
          if (roleDepartment === department.name) {
            departmentId = department.id;
          }
        });
        let sql = query.addRole;
        let params = [roleName, roleSalary, departmentId];
        db.query(sql, params, (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(`${roleName} role added to the ${roleDepartment} department.`);
          promptUser();
        });
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
    if (action === "Add a role") {
      addRole();
    }
  });
};

promptUser();
