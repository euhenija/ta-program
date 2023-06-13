import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardsPage extends BasePage {
  readonly launchStatisticsAreaResizeIcon: Locator;
  readonly launchStatisticsAreaWidget: Locator;
  readonly launchStatisticsAreaWidgetHeader: Locator;
  readonly launchStatisticsAreaWidget2: Locator;
  readonly widgetGridArea: Locator;
  readonly dashboardWidgets: Locator;
  readonly overalStatisticsDonutWidget: Locator;

  constructor(page: Page) {
    super(page);
    this.launchStatisticsAreaResizeIcon = page.locator('div:nth-child(2) > .react-resizable-handle');
    this.launchStatisticsAreaWidget = page.locator('.widget__widget--mVI7B').nth(1);
    this.launchStatisticsAreaWidgetHeader = page.locator('.widget__widget-header--eR4Gu').nth(1);
    this.widgetGridArea = page.locator('.widgets-grid');
    this.dashboardWidgets = page.locator('.widget__widget-container--3ZTIX');
    this.overalStatisticsDonutWidget = page.locator('.widget__widget-container--3ZTIX').nth(7);
  }

  async goto() {
    await super.goto('/ui/#default_personal/dashboard/2518');
  }

  async dragAndDropWidget(widgetHeader: Locator, xCoordinate: number, yCoordinate: number) {
    await widgetHeader.dragTo(this.widgetGridArea, {
      force: true,
      targetPosition: {
        x: xCoordinate,
        y: yCoordinate,
      },
    });
  }
}