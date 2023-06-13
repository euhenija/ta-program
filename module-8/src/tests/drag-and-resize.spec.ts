import { test, expect } from '@playwright/test';
import { DashboardsPage } from '../po/dashboards-page';

test.use({ storageState: 'auth.json' });

test.beforeEach(async ({ page }) => {
  page.on('request', request => console.log('>>', request.method(), request.url(), request.postData()));
  page.on('response', response => console.log('<<', response.status(), response.url()));
});


test('drag and drop widget on dashbord', async ({ page }) => {
  const dashboardsPage = new DashboardsPage(page);
  await dashboardsPage.goto();

  const widgetBoxBeforeDragAndDrop = await dashboardsPage.launchStatisticsAreaWidget.boundingBox();
  const allDashboardWidgets = await dashboardsPage.dashboardWidgets.all();
  const widgetCoordinatesBeforeDragAndDrop = await dashboardsPage.getpageElementsCoordinates(allDashboardWidgets);

  await dashboardsPage.dragAndDropWidget(dashboardsPage.launchStatisticsAreaWidgetHeader, 700, 700)
  
  const widgetBoxAfterDragAndDrop = await dashboardsPage.launchStatisticsAreaWidget.boundingBox();
  const widgetCoordinatesAfterDragAndDrop = await dashboardsPage.getpageElementsCoordinates(allDashboardWidgets);

  expect(widgetBoxBeforeDragAndDrop?.x).not.toEqual(widgetBoxAfterDragAndDrop?.x);
  expect(widgetBoxBeforeDragAndDrop?.y).not.toEqual(widgetBoxAfterDragAndDrop?.y);
  expect(widgetCoordinatesBeforeDragAndDrop).not.toStrictEqual(widgetCoordinatesAfterDragAndDrop);

  await dashboardsPage.dragAndDropWidget(dashboardsPage.launchStatisticsAreaWidgetHeader, 0, 0)
});

test('resize launch statistics area widget', async ({ page }) => {
  const dashboardsPage = new DashboardsPage(page);
  await dashboardsPage.goto();

  const widgetBoxBeforeResize = await dashboardsPage.launchStatisticsAreaWidget.boundingBox();
  
  const allDashboardWidgets = await dashboardsPage.dashboardWidgets.all();
  const widgetCoordinatesBeforeResize = await dashboardsPage.getpageElementsCoordinates(allDashboardWidgets);

  await dashboardsPage.resizeElement(dashboardsPage.launchStatisticsAreaResizeIcon, 1500, 0)

  const widgetBoxAfterResize = await dashboardsPage.launchStatisticsAreaWidget.boundingBox();
  const widgetCoordinatesAfterResize = await dashboardsPage.getpageElementsCoordinates(allDashboardWidgets);

  expect(widgetCoordinatesBeforeResize).not.toStrictEqual(widgetCoordinatesAfterResize);
  expect(widgetBoxBeforeResize?.width).not.toEqual(widgetBoxAfterResize?.height);
  expect(widgetBoxBeforeResize?.width).not.toEqual(widgetBoxAfterResize?.height);

  await dashboardsPage.resizeElement(dashboardsPage.launchStatisticsAreaResizeIcon, 700, 550)
});


test('resize launch statistics area widgetq', async ({ page }) => {
  const dashboardsPage = new DashboardsPage(page);
  await dashboardsPage.goto();
  const requestPromise = page.waitForRequest('**/widget/2508');
  const request = await requestPromise;
  await dashboardsPage.overalStatisticsDonutWidget.scrollIntoViewIfNeeded();
  await expect(dashboardsPage.overalStatisticsDonutWidget).toBeVisible();
});