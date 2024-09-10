const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class CrmPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const crmPage = new CrmPage(page, browser);
    return new Proxy(crmPage, {
      get: function (target, property) {
        return crmPage[property] || browser[property] || page[property];
      },
    });
  }

  async get(path) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async post(path, body) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async login() {
    const body = {
      firstName: 'test',
      lastName: 'smith',
      companyId: '51e0373c6f35bd826f47e9a1',
      email: 'test.smith@mail.com',
      authProviderId: '',
      permissions: ['owner'],
    }
    const { data } = await this.post('user', body);
    this.id = data[0].id;
    const token = jwt.sign(
      { id: data[0].id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    await this.page.setExtraHTTPHeaders({ Authorization: `Bearer ${token}` });
    await this.page.goto(`http://localhost:3000/auth/callback?token=${token}`);
  }

  constructor(page, browser) {
    this.page = page;
    this.id = '';
    this.browser = browser;
  }

  async logout() {
    await fetch(`${process.env.REACT_APP_API_URL}user/${this.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }
}

module.exports = CrmPage;
