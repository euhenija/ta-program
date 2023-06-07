Feature: Launches feature

Scenario Outline: (1) Launch statistics chart (bar view) should display correct quantity of passed tests
  Given I check that "allDashboardTitle" is present on Demo dashboard page
  When I click on "demoDashboard" on All dashboards page

  When I click on launch statistics chart at a point ("<xCoordinate>", "145")
  And I count quantity of tests with "testsWithPassedStatus" status and save its quantity as "passedTestsQuantity" vaiable
  Then Variable "passedTestsQuantity" should be equal to "<quantity_of_tests>"

  And I click on "dashboardButton" icon on side menue

  Examples:
  | xCoordinate  | quantity_of_tests |
  | -220         | 1                 |
  | -110         | 5                 |
  | 0            | 10                |
  | 110          | 20                |
  | 220          | 30                |