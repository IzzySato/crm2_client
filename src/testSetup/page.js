const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class CrmPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    const crmPage = new CrmPage(page, browser);
    return new Proxy(crmPage, {
      get: function(target, property) {
        return crmPage[property] ||  browser[property] || page[property];
      }
    })
  }

  async login(){
    const data = await fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'test',
        lastName: 'smith',
        companyId: '51e0373c6f35bd826f47e9a1',
        email: 'test.smith@mail.com',
        authProviderId: '',
        permissions: ['owner']
      })
    });
    const result = await data.json();
    this.id = result[0]._id;
    const token = jwt.sign({ id: result[0]._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h'});
    await this.page.setExtraHTTPHeaders({'Authorization': `Bearer ${token}`});
    await this.page.goto(`http://localhost:3000/auth/callback?token=${token}`);
  }

  constructor (page, browser) {
    this.page = page;
    this.id = '';
    this.browser = browser;
  }

  async close () {
    await fetch(`http://localhost:8080/user/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    this.browser.close();
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML)
  }
}

module.exports = CrmPage;