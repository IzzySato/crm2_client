const { describe, expect, test } = require('@jest/globals');
const Page = require('../../../testSetup/page');

describe('home page', () => {
  let page;

  beforeEach(async () => {
    page = await Page.build();
    await page.login();
  });

  afterEach(async() => {
    await page.close();
  });

  test('Navigation to be correct text', async () => {
    const text = await page.getContentsOf('.navList a:first-child');
    expect(text).toBe('Customers');
  });
});