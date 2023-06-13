import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async resizeElement(resizableElement: Locator, xCoordinate: number, yCoordinate: number) {
    await resizableElement.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(xCoordinate, yCoordinate);
    await this.page.mouse.up();
  }

  async getpageElementsCoordinates(multipleElementsArray: Array<Locator>){
    return Promise.all(multipleElementsArray.map(el => el.boundingBox()));
  }
}