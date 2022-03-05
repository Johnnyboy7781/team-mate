const inquirer = require('inquirer');

const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const validate = require('./validation');
const generateTeammemberElements = require('./generateFiles');

const teammembers = [];

const questions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'Manager\'s name: ',
        validate: input => validate(input)
    },
    {
        type: 'input',
        name: 'managerId',
        message: 'Manager\'s employee ID: ',
        validate: input => validate(input)
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'Manager\'s email: ',
        validate: input => validate(input, 'email')
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: 'Manager\'s office number: ',
        validate: input => validate(input)
    }
]

const generateTeammember = (type, answers) => {
    let employee;

    if (type === 'Manager') {
        employee = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
    } else if (type === 'Engineer') {
        employee = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGithub);
    } else {
        employee = new Intern(answers.intName, answers.intId, answers.intEmail, answers.intSchool);
    }

    teammembers.push(employee);

    teammembers.forEach(member => console.log(member))
}

const promptAddTeammember = () => { 
    console.log(`
    ====================
      Add a teammember
    ====================  
    `);

    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Which type teaemember would you like to add?',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'engName',
            message: 'Engineer\'s name: ',
            validate: input => validate(input),
            when: ({ type }) => {
                return type === 'Engineer' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'engId',
            message: 'Engineer\'s employee ID: ',
            validate: input => validate(input),
            when: ({ type }) => {
                return type === 'Engineer' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'engEmail',
            message: 'Engineer\'s email: ',
            validate: input => validate(input, 'email'),
            when: ({ type }) => {
                return type === 'Engineer' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'engGithub',
            message: 'Engineer\'s github username: ',
            validate: input => validate(input),
            when: ({ type }) => {
                return type === 'Engineer' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'intName',
            message: 'Intern\'s name: ',
            validate: input => validate(input),
            when: ({ type }) => {
                return type === 'Intern' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'intId',
            message: 'Intern\'s employee ID: ',
            validate: input => validate(input),
            when: ({ type }) => {
                return type === 'Intern' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'intEmail',
            message: 'Intern\'s email: ',
            validate: input => validate(input, 'email'),
            when: ({ type }) => {
                return type === 'Intern' ? true : false;
            }
        },
        {
            type: 'input',
            name: 'intSchool',
            message: 'Intern\'s school: ',
            validate: input => validate(input),
            when: ({ type }) => {
                return type === 'Intern' ? true : false;
            }
        },
        {
            type: 'confirm',
            name: 'addNewMember',
            message: 'Teammember created! Would you like to add another?',
            default: false
        }
    ])
    .then(answers => {
        generateTeammember(answers.type, answers);

        if (answers.addNewMember) {
            promptAddTeammember();
        } else {
            generateTeammemberElements(teammembers);
        }
    })
}

module.exports = () => {
    console.log(`
    ==========================================
              Welcome to Team Mate
     Please enter the manager's info to begin
             *All info is required*
    ==========================================         
    `);

    inquirer.prompt(questions)
        .then(answers => generateTeammember('Manager', answers))
        .then(promptAddTeammember)
}