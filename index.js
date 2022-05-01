// Require
const db = require("./db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");
const query = require("./db/queries");

// Connect to database
db.connect((err) => {
  if (err) throw err;
});

// Main choices
const prompts = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee"],
    },
  ]);
};

// Makes SQL query for all departments
const viewAllDepartments = () => {
  let sql = query.allDepartments;
  db.query(sql, (err, rows) => {
    console.table(rows);
    promptUser();
  });
};

// Makes SQL query for all roles
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

// Makes SQL query for all employees
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
          console.log(`The ${roleName} role was added to the ${roleDepartment} department.`);
          promptUser();
        });
      });
  });
};

const addEmployee = () => {
  // retrieve all roles
  let sql = query.roles;
  db.query(sql, (error, response) => {
    let roleArray = [];
    response.forEach((role) => {
      roleArray.push(role.title);
    });
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the name of the employee.");
              return false;
            }
          },
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the name of the employee.");
              return false;
            }
          },
        },
        {
          name: "employeeRole",
          type: "list",
          message: "What is the employee's role?",
          choices: roleArray,
        },
        {
          name: "employeeManager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: ["John Doe", "Ashley Rodriguez", "Kunal Singh", "Sarah Lourd"],
        },
      ])
      .then((newEmployeeData) => {
        const { firstName, lastName, employeeRole, employeeManager } = newEmployeeData;
        let roleId;
        let managerId;
        managerName = employeeManager.split(" ", 1);
        // gets manager name and id
        response.forEach((employee) => {
          if (managerName == employee.first_name) {
            managerId = employee.id;
          }
        });
        // gets id for role
        response.forEach((role) => {
          if (employeeRole === role.title) {
            roleId = role.id;
          }
          // console.log(role.title);
        });

        let sql = query.addEmployee;
        let params = [firstName, lastName, roleId, managerId];
        db.query(sql, params, (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(`The employee was added to the database.`);
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
    if (action === "Add an employee") {
      addEmployee();
    }
  });
};

// Starts the inquirer prompts
promptUser();
