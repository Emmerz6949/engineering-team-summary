const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeRoleQ = {
    type: "list",
    name: "eRole",
    message: "What is the employee's role?",
    choices: ["Engineer", "Intern"]
};

const moreQ = {
    type: "confirm",
    name: "more",
    message: "Would you like to add another employee?"
};

const engineerQs = [
    {
        type: "input",
        message: "What is the engineer's name?",
        name: "engineerName"
    },
    {
        type: "number",
        message: "What is the engineer's ID number?",
        name: "engineerId"
    },
    {
        type: "input",
        message: "What is the engineer's email address?",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "What is the engineer's GitHub username?",
        name: "hubName"
    }
];

const internQs = [
    {
        type: "input",
        message: "What is the intern's name?",
        name: "internName"
    },
    {
        type: "number",
        message: "What is the intern's ID number?",
        name: "internId"
    },
    {
        type: "input",
        message: "What is the intern's email address?",
        name: "internEmail"
    },
    {
        type: "input",
        message: "What school is the intern enrolled at?",
        name: "skool"
    }
];

gatherInfo();

async function gatherInfo() {
    try {
        console.log(` `);
        console.log(`Welcome to the Engineering Team Summary command-line application!`);
        console.log(`First things first, every team needs a manager! So...`);
        console.log(` `);
        const managerInfo = await inquirer.prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "manageName"
            },
            {
                type: "number",
                message: "What is the manager's ID number?",
                name: "manageId"
            },
            {
                type: "input",
                message: "What is the manager's email address?",
                name: "manageEmail"
            },
            {
                type: "number",
                message: "What is the manager's office number?",
                name: "offNum"
            }
        ]);
        const {manageName, manageId, manageEmail, offNum} = managerInfo;
        const mamsir = new Manager(manageName, manageId, manageEmail, offNum);
        employees.push(mamsir);

        console.log(` `);
        console.log(`Great! But it's not an engineering team without at least one engineer! So...`);
        console.log(` `);
        const firstEngineer = await inquirer.prompt(engineerQs);
        const {engineerName, engineerId, engineerEmail, hubName} = firstEngineer;
        const firstE = new Engineer(engineerName, engineerId, engineerEmail, hubName);
        employees.push(firstE);

        console.log(` `);
        const moreE = await inquirer.prompt(moreQ);
        let {more} = moreE;
        do {
            console.log(` `);
            const employeeRole = await inquirer.prompt(employeeRoleQ);
            const {eRole} = employeeRole;

            if (eRole === "Engineer") {
                console.log(` `);
                const addEngineer = await inquirer.prompt(engineerQs);
                const {engineerName, engineerId, engineerEmail, hubName} = addEngineer;
                const moreEngineer = new Engineer(engineerName, engineerId, engineerEmail, hubName);
                employees.push(moreEngineer);
            }
            if (eRole === "Intern") {
                console.log(` `);
                const addIntern = await inquirer.prompt(internQs);
                const {internName, internId, internEmail, skool} = addIntern;
                const moreIntern = new Intern(internName, internId, internEmail, skool);
                employees.push(moreIntern);
            }
            console.log(` `);
            const moreE = await inquirer.prompt(moreQ);
            more = moreE.more;
        } 
        while (more === true);

        fs.writeFile(outputPath, render(employees), function(err){
            if (err) {
                return console.log(err);
            }            
        });

    } catch (err) {
        console.log(err);
    }
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
