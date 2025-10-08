# LambdaTest Cypress Playground Automation

This repo contains Cypress automation tests for [LambdaTest Selenium Playground](https://www.lambdatest.com/selenium-playground).

## Test Scenarios

1. Drag & Drop Slider (verify slider moves to 95).
2. Input Form Submit with:
   - Accessibility audit (axe + pa11y).
   - Performance audit (Lighthouse).
   - Assertions for success message.

## Features

- Parallel execution on LambdaTest Cloud (Windows 10 Chrome, macOS Catalina Edge).
- Cypress video recordings, screenshots, terminal logs enabled.
- Uses both CSS + XPath selectors.
- Configured with `.gitpod.yml` for Gitpod runs.
- Cross-Browser Testing: Execute tests across multiple browsers to ensure compatibility.
- CI/CD Integration: Automate test execution with Jenkins.

**🔧 Prerequisites**
Before running the tests, ensure you have the following installed:

Node.js
 (Recommended: LTS version)

npm
 (Comes bundled with Node.js)

Cypress
 (Test automation framework)

LambdaTest CLI
 (Optional for cloud execution)

Jenkins
 (For CI/CD)

 **Installation**

Clone this repository to your local machine:

git clone https://github.com/dnarayana74/Cypress_101.git
cd Cypress_101

## Run Locally

```bash
npm install
npx cypress open
```

**CI/CD with Jenkins**
You can automate test execution using Jenkins:

Install Jenkins on your server or local machine.
Install Required Plugins:
NodeJS Plugin
Pipeline Plugin
Git Plugin
Create a New Pipeline Job:
Select "Pipeline" as the job type.
Configure Pipeline Scri

**Run the Pipeline:**

This will automatically checkout the code, install dependencies, and execute all Cypress tests.

Screenshots and videos of test runs will be archived.

**🔐 Security**
Ensure that sensitive information such as API keys and credentials are not exposed in the repository. Use environment variables or Jenkins credentials to handle sensitive data securely.
