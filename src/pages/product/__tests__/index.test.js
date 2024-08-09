const { describe, expect, test } = require('@jest/globals');
const Page = require('../../../testSetup/page');

let page;

beforeEach(async () => {
  page = await Page.build();
});

afterEach(async() => {
  await page.browser.close();
});

describe('Landing Product Page Navigation', () => {
  test('navigation Product', async () => {
    await page.login();
    const text = await page.getContentsOf('.navList a:nth-child(2)');
    expect(text).toBe('Products');
    await page.logout();
  });
});

describe('Create Product', () => {
  test('Create product button clicked', async () => {
    await page.login();
    await page.page.click('.navList a:nth-child(2)');
    await page.page.waitForSelector('.productCreateBtn p', { visible: true });
    const createBtn = await page.getContentsOf('.productCreateBtn p');
    expect(createBtn).toBe('Create');
    await page.logout();
  });
});