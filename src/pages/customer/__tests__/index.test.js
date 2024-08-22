const { describe, expect, test } = require('@jest/globals');
const Page = require('../../../testSetup/page');

let page;

beforeEach(async () => {
  page = await Page.build();
});

afterEach(async() => {
  await page.browser.close();
});

describe('Landing Page Navigation', () => {
  test('navigation Customer', async () => {
    await page.login();
    const text = await page.getContentsOf('.navList a');
    expect(text).toBe('Customers');
    await page.logout();
  });
});

describe('Create Customer', () => {
  test('Create customer button clicked', async () => {
    await page.login();
    const createBtn = await page.getContentsOf('button.customerCreateBtn p');
    expect(createBtn).toBe('Create');
    await page.page.click('button.customerCreateBtn');
    const modalTitle = await page.getContentsOf('.createCustomerModal div div div h3');
    expect(modalTitle).toBe('Create Customer');
    await page.logout();
  });
});