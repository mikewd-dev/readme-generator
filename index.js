const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
// const { type } = require("os");

// Function to generate README content based on user responses
function generateREADME(data) {
  // Use the 'data' object to structure the README content
  // Create sections, badges, links, etc., based on user responses
  const {
    name,
    description,
    installation,
    usage,
    license,
    contributing,
    tests,
    github,
    email,
  } = data;

  const licenseBadge = `![License](https://img.shields.io/badge/License-${license}-blue.svg)`;

  const readmeContent = `
    # ${name}

    ## Table of Contents
    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Questions](#questions)

    ## Description
    ${description}

    ## Installation
    ${installation}

    ## Usage
    ${usage}

    ## License
    ${licenseBadge}
    This application is covered under the ${license} license.

    ## Contributing
    ${contributing}

    ## Tests
    ${tests}

    ## Questions
    GitHub: [${github}](https://github.com/${github})
    Email: ${email}
  `;

  return readmeContent;
}

// Array of questions for user
const questions = [
  // Your list of prompts for gathering project information
  {
    type: "input",
    message: "What is your project name?",
    name: "name",
  },
  {
    type: "input",
    message: "Give a description of your project",
    name: "description",
  },
  {
    type: "checkbox",
    name: "contents",
    message: "What are the contents of the Readme?",
    choices: [
      "Installation",
      "Usage",
      "License",
      "Contributing",
      "Tests",
      "Questions",
    ],
  },
  {
    type: "checkbox",
    message: "Is there any installation required?",
    name: "installation",
    choices: ["Yes", "No"],
  },
  {
    type: "input",
    message: "How do you use the readme generator?",
    name: "usage",
  },
  {
    type: "checkbox",
    message: "Select a license",
    name: "license",
    choices: ["MIT", "APACHE 2.0", "Mozilla"],
  },
  {
    type: "input",
    message: "Names of contributors to the project",
    name: "contributors",
  },
  {
    type: "input",
    message: "Are there any tests to run?",
    name: "tests",
  },
  {
    type: "input",
    message: "Any questions?",
    name: "questions"
  },
];

// Prompt the user for information
inquirer.prompt(questions).then((answers) => {
  // Generate the README content based on user responses
  const readmeContent = generateREADME(answers);

  // Write the generated README content to a file (e.g., README.md)
  fs.writeFile("README.md", readmeContent, (err) => {
    if (err) throw err;
    console.log("README.md has been created successfully!");
  });
});
