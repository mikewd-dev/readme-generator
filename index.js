const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
// const { url } = require("inspector");

// Function to generate README content based on user responses
function generateREADME(data) {
  const {
    name,
    description,
    installation,
    usage,
    license,
    contributing,
    tests,
    githubUsername,
    githubLink,
  } = data;

  const licenseBadges = {
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "APACHE 2.0":
      "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    Mozilla:
      "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
  };

  const licenseBadge = licenseBadges[license];
  const licenseNotice = `This application is covered under the ${license} license.`;

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

## License
${licenseBadge}
${licenseNotice}

## Installation
${installation}

## Usage
${usage}

## Contributing
${contributing}

## Tests
${tests}

## Questions
If you have any questions, feel free to reach out:
- GitHub: ${githubUsername}
- GitHub Link: ${githubLink}

`;

  return readmeContent;
}


// Prompt the user with a series of questions
const questions = [
  // Prompt for list of questions
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
  type: "input",
  message: "Is there any installation required?",
  name: "installation",
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
  message: "How can someone contribute to this project?",
  name: "contributing",
},
{
  type: "input",
  message: "Are there any tests to run?",
  name: "tests",
},
{
  type: "input",
  message: "What is your GitHub username?",
  name: "githubUsername",
},
{
  type: "input",
  message: "What is the link to your GitHub profile?",
  name: "githubLink",
},
];

// Prompt the user for information
inquirer.prompt(questions).then((answers) => {
  // Generate the README content based on user responses
  const readmeContent = generateREADME(answers);

  // Write the generated README content to a file (e.g., README.md)
  fs.writeFile("GENERATE-README.md", readmeContent, (err) => {
    if (err) throw err;
    console.log("README.md has been created successfully!");
  });
});
