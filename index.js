const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/html");
const { clear } = require("console");

const employeeArray = [];

const managerQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is your manager's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is their employee ID?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is their e-mail address?',
        validate: function (email) {
            if(email.includes("@" && ".")) {
                return true;
            }else {
                return "PLEASE TYPE IN A VALID E-MAIL ADDRESS."
            }
        }
    },
    {
        type: 'input',
        name: "officeNumber",
        message: 'What is their office number?'
    },
]


const newRole = [
    {
        type: "list",
        name: "role",
        message: "What is the role of the next employee?",
        choices: ["Engineer", "Intern", "Manager"],
    },
]

const engineerQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is this engineer's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is their employee ID?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is their e-mail address?',
        validate: function (email) {
            if(email.includes("@" && ".")) {
                return true;
            }else {
                return "PLEASE TYPE IN A VALID E-MAIL ADDRESS."
            }
        }
    },
    {
        type: 'input',
        name: "github",
        message: 'What is their GitHub username?'
    }
    
]

const internQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is this intern's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is their employee ID?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is their e-mail address?',
        validate: function (email) {
            if(email.includes("@" && ".")) {
                return true;
            }else {
                return "PLEASE TYPE IN A VALID E-MAIL ADDRESS."
            }
        }
    },
    {
        type: 'input',
        name: "school",
        message: 'What school is this intern attending?'
    }
    
]

const addEmployee = () => {
    inquirer.prompt([
        {
        type: 'confirm',
        name: "continue",
        message: 'Would you like to add another employee?'
        }
    ]).then(function (data) {

        if (data.continue == true) {
            questions(engineerQs, internQs, managerQs);
        } else {
            const html = render(employeeArray);

            fs.writeFile(outputPath, html, (err) =>
            err ? console.log(err) : console.log('Success! Building your team...'))
        }
    })
}

const questions = (qE, qI, qM) => {
    inquirer.prompt(newRole)
        .then((response) =>{
            if (response.role === "Engineer") {
                inquirer.prompt(qE)
                    .then((answers) => {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
                        employeeArray.push(engineer)
                        addEmployee();  
                    })
            } else if (response.role === "Intern") {
                inquirer.prompt(qI)
                .then((answers) => {
                    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
                    employeeArray.push(intern)
                    addEmployee();  
                })
            } else if (response.role === "Manager") {
                inquirer.prompt(qM)
                .then((answers) => {
                    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
                    employeeArray.push(manager)
                    addEmployee();  
                })
            }
        })

}

const init = (qM) => {
    console.log("Let's get started with building your team! We'll start with your manager.")
    inquirer.prompt(qM)
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            employeeArray.push(manager)
            addEmployee()
        })
    }

init(managerQs);