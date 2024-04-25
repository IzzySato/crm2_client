const puppeteer = require('puppeteer');
const { describe, expect, test } = require('@jest/globals');

describe('home page', () => {

  let browser, page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterEach(async() => {
    await browser.close();
  });

  test('Navigation to be correct text', async () => {
    const text = await page.$eval('.navList a:first-child', el => el.innerHTML);
    expect(text).toBe('Customers');
  });
});