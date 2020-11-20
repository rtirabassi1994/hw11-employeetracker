const inquirer = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

const connection = require("./connection");

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  inquirer.prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View Department",
          value: "VIEW_DEPARTMENT"
        },
        {
          name: "View Roles",
          value: "VIEW_ROLE"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Update Employee",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        //You will need to complete the rest of the switch statement
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }).then(function(answer){
        switch (answer.choice) {
            case "VIEW_EMPLOYEES":
              return viewEmployees();
            case "VIEW_DEPARTMENT":
              return viewDepartment();
            case "VIEW_ROLE":
              return viewRole();
            case "ADD_EMPLOYEE":
              return addEmployee();
            case "ADD_ROLE":
              return addRole();
            case "ADD_DEPARTMENT":
              return addDepartment();
            case "UPDATE_EMPLOYEE_ROLE":
              return updateEmployeeRole();
            default:
              return quit();
        }
    })
}

// Call the appropriate function depending on what the user chose
function viewDepartment() {
    const query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("\n ----------------------------------------\n");
        console.table(res);
        loadMainPrompts();
    })
}

function viewRole() {
    const query = "SELECT * FROM role";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("\n ----------------------------------------\n");
        console.table(res);
        loadMainPrompts();
    })


}

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("\n ----------------------------------------\n");
        console.table(res);
        loadMainPrompts();
    })

}

function addDepartment() {
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What department would you be adding today?"
        }
    ]).then(function(answer){
        const newDept = answer.newDepartment;
        const query = "INSERT INTO department(department) VALUES (?)";
        connection.query(query, newDept, function(err){
            if(err) throw err;
            console.log("\n ----------------------------------------\n");
            console.log("Department was succesfully added.")
            viewDepartment();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: "Role",
            type: "input",
            message: "What role will you be adding today?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is their salary?"
        },
        {
            name: "DepartmentID",
            type: "input",
            message: "What is the department ID?"
        }
    ]).then(function(answer){
        console.log (answer.Role)
        const newRole = answer.Role;
        const salary = answer.Salary;
        const DepartmentID = answer.DepartmentID;
        const query = "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(query, [newRole, salary, DepartmentID], function(err){
            if(err) throw err;
            console.log("\n ----------------------------------------\n");
            console.log("Role was succesfully added.")
            viewRole();
        })
    })

}

function addEmployee() {
    inquirer.prompt([
        {
            name: "FirstName",
            type: "input",
            message: "What is the first name?"
        },
        {
            name: "LastName",
            type: "input",
            message: "What is the last name?"
        },
        {
            name: "RoleID",
            type: "input",
            message: "What is the role ID?"
        },
        {
            name: "ManagerID",
            type: "input",
            message: "What is the ID?"
        }

    ]).then(function(answer){
        console.log (answer.Role)
        const newRole = answer.Role;
        const salary = answer.Salary;
        const DepartmentID = answer.DepartmentID;
        const query = "INSERT INTO employee(first_name, last_name, department_id) VALUES (?, ?, ?)";
        connection.query(query, [newRole, salary, DepartmentID], function(err){
            if(err) throw err;
            console.log("\n ----------------------------------------\n");
            console.log("Role was succesfully added.")
            viewRole();
        })
    })
    


}

function updateEmployeeRole() {

}

function quit() {
    connection.end()
    console.log("Goodbye!");
    process.exit();
}

init();