#!/usr/bin/env node

const shell = require("shelljs");
const inquirer = require("inquirer");
const { repoSelector } = require("./repoSelector");

const templatesRepo = 'https://github.com/ahmed-issaoui/boiling.git';
let branchName = 'main';

//Check if git is enable
if (!shell.which('git')) {
    shell.echo('This requires git');
    shell.exit(1);
}

const questions = [
    {
        type: "input",
        name: "projectName", 
        message: "It's a Next.js, Redux, styled-Components template. Please enter your new project's name.",
        default: "react-project"
    },
                {
                    type: "list",
                    name: "platform",
                    message: "What is the platform of this project?",
                    choices: ["Web", "Desktop", "Mobile"],
                    default: "Web"
                },

                        {
                            type: "list",
                            name: "desktopFramework",
                            message: "What do you want to use as a desktop framework?",
                            choices: ["Electron", "Tauri"],
                            default: "Electron",
                            when: (answers) => answers.platform === "Desktop"
                        },
                                {
                                    type: "confirm",
                                    name: "addLocalExpressServer",
                                    message: "Do you want to add a local express server to electron?",
                                    default: false,
                                    when: (answers) => answers.desktopFramework === "Electron"
                                },
                                {
                                    type: "confirm",
                                    name: "addPuppeteer",
                                    message: "Do you want to add puppeteer?",
                                    default: false,
                                    when: (answers) => answers.desktopFramework === "Electron"
                                },
                                    {
                                        type: "confirm",
                                        name: "addPuppeteerClient",
                                        message: "Do you want to add a client puppeteer?",
                                        default: false,
                                        when: (answers) => answers.addPuppeteer === true
                                    },
                        {
                            type: "list",
                            name: "webFramework",
                            message: "Do you want plain React or with a metaframework?",
                            choices: ["React", "Next.js"],
                            default: "React",
                            when: (answers) => answers.platform === "Web"
                        },

                        {
                            type: "list",
                            name: "mobileFramework",
                            message: "What do you want to use as a mobile framework?",
                            choices: ["Expo React Native"],
                            default: "Expo React Native",
                            when: (answers) => answers.platform === "Mobile"
                        },


            {
                type: "list",
                name: "database",
                message: "What is your database?",
                choices: ["No Database", "Firebase", "MongoDB", "MySQL"],
                default: "Firebase"
            },

                    {
                        type: "confirm",
                        name: "addFirebaseReactHooks",
                        message: "Do you want to add react-firebase-hooks?",
                        default: false,
                        when: (answers) => answers.database === "Firebase"
                    },
                    {
                        type: "list",
                        name: "paymentSystem",
                        message: "Do you want plain React or with metaframework?",
                        choices: ["No payment", "Stripe", "Stripe + COD", "Stripe + COD + eTN"],
                        default: "No payment",
                        when: (answers) => answers.database === "Firebase"
                    },

];

inquirer.prompt(questions).then(answers => {
    const { projectName, platform, desktopFramework, addLocalExpressServer, addPuppeteer, addPuppeteerClient, webFramework, mobileFramework, database, addFirebaseReactHooks, paymentSystem } = answers;

    console.log("--------------------");
    console.log("Your preferences:");
    console.log(`Platform: ${platform}`);
        if (platform === "Desktop") {

            console.log(`Desktop framework: ${desktopFramework}`); 
            
            if (desktopFramework === "Electron") {
                console.log(`Add local Express server: ${addLocalExpressServer ? "Yes" : "No"}`);
                console.log(`Add Puppeteer? : ${addPuppeteer ? "Yes" : "No"}`);
                console.log(`Add client to puppeteer? : ${addPuppeteerClient ? "Yes" : "No"}`);
            }
        }
        if (platform === "Web"){
            console.log(`Web framework: ${webFramework}`);    
        }
        if (platform === "Mobile"){
            console.log(`Mobile framework: ${mobileFramework}`);    
        }
        
    console.log(`Database framework: ${database}`); 
        if (database === "Firebase") {
                console.log(`Add react-firebase-hooks? : ${addFirebaseReactHooks ? "Yes" : "No"}`); 
                console.log(`Payment system: ${paymentSystem}`); 
        }


    console.log("--------------------");


    shell.exec(`mkdir ${projectName}`);
    shell.cd(`${projectName}`);
    shell.exec(`git clone ${templatesRepo} .`);

    branchName = repoSelector(answers)

    shell.exec(`git checkout -B ${branchName} remotes/origin/${branchName}`);
    shell.exec('git checkout --orphan latest_branch');
    shell.exec('git add -A');
    shell.exec('git commit -am "init the new project and install Next.js, Redux, and Styled-Components"');
    shell.exec(`git branch -D ${branchName}`);
    shell.exec('git branch -m master');
    shell.exec('git branch -D main');
    shell.exec('git remote remove origin');
    shell.echo('New project has been created!');
});

