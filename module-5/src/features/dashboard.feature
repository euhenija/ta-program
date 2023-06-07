Feature: Dashboards feature

Background: I check presence of demo dashboard on the dashboards page
  Given I check that "allDashboardTitle" is present on Demo dashboard page

Scenario Outline: (1) Should be able to create new dashboard and delete it
  And I click on "addNewDashsboardBtn" on All dashboards page

  And I set value "<dashboard_name>" in "nameInputField" field on Add dashboard modal window
  And I set value "<dashboard_description>" in "descriptionInputField" field on Add dashboard modal window
  And I click on "addBtn" button on Add new dashboard modal

  And I click on "dashboardButton" icon on side menue
  Then I check that "<dashboard_name>" dashboard is "present" on All Dashboards page

  When I delete "<dashboard_name>" dashboard
  And I click on "deleteBtn" button on Add new dashboard modal
  Then I check that "<dashboard_name>" dashboard is "absent" on All Dashboards page

  Examples:
    | dashboard_name  | dashboard_description   |
    | You logged into | New description         |
    | New dashboard   | Hello World             |

Scenario: (2) Sould create new failed tests trend chart widget and delete it
  When I click on "demoDashboard" on All dashboards page
  Then I check that "demoDashboardTitle" is present on Demo dashboard page

  When I click on "addNewWidgetBtn" button on Demo dashboard page
  And I click on "failedCasesTrendChart" button on Add new widget modal
  And I click on "nextStepBtn" button on Add new widget modal
  And I click on "addFilterBtn" button on Add new widget modal
  And I set value "25" in "itemsInputField" field on Add widget modal window
  And I click on "nextStepBtn" element on Add new widget modal

  And I set value "New widget trend1" in "nameInputField" field on Add widget modal window
  And I set value "New widget Description1" in "descriptionInputField" field on Add widget modal window
  And I click on "addBtn" button on Add new widget modal
  Then I check that "bugTrendWidgetHeader" is present on Demo dashboard page

  And I click on "bugTrendWidgetHeader" element on Demo dashboard page
  And I click on "deleteBugTrendWidgetBtn" button on Demo dashboard page
  And I click on "deleteBtn" button on Add new widget modal
  Then I check that "bugTrendWidgetHeader" is absent on Demo dashboard page
  And I click on "dashboardButton" icon on side menue

Scenario: (3) I should be able to create new dashboard 
  When I click on "addNewDashsboardBtn" on All dashboards page
  And I set dashboard name and description
    | dashboardName      | dashboardDescription    |
    | Name from table    | Description from table  |
  And I click on "addBtn" button on Add new dashboard modal
  And I click on "dashboardButton" icon on side menue
  And I check that "Name from table" dashboard is "present" on All Dashboards page
  But I check that "Unknown" dashboard is "absent" on All Dashboards page
  Then I check that "Unknown" dashboard is "absent" on All Dashboards page

  When I delete "Name from table" dashboard
  And I click on "deleteBtn" button on Add new dashboard modal
  Then I check that "Name from table" dashboard is "absent" on All Dashboards page
  And I click on "dashboardButton" icon on side menue
