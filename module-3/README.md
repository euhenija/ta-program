### mentoring-program-advanced
Test automation framework for testing EPAM Report portal

### Preparation for local run:
To run tests for Report portal locally complete steps:
  1. Download and install Docker
  2. Set up Report Portal container with Docker (instructions available here: https://reportportal.io/docs/installation-steps/DeployWithDockerOnWindows ,
  https://reportportal.io/docs/installation-steps/DeployWithDockerOnLinuxMac)
  3. Run Report portal locally (https://localhost:8080)

### Test execution 
Default test execution on local environment:
  - use npm run test comand;
Test executin on specified environment:
  - specify ENVIRONMENT variable in run.sh file;
  - use sh run.sh comand;
### HTML report:
Use npm run html:report command after test execution to generate html report
