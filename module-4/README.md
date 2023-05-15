## mentoring-program-advanced
Test automation framework for testing EPAM Report portal

## Preparation for local run:
To run tests for Report portal locally complete steps:

Download and install Docker
Set up Report Portal container with Docker (instructions available here: https://reportportal.io/docs/installation-steps/DeployWithDockerOnWindows , https://reportportal.io/docs/installation-steps/DeployWithDockerOnLinuxMac/)
Run Report portal locally (https://localhost:8080)

## Test execution
Default test execution on local environment:

use npm run test comand;
Test executin on specified environment:
specify ENVIRONMENT variable in run.sh file;
use sh run.sh comand;


## Allure report:
Use "allure generate allure-results --clean && allure open" command after test execution to generate report