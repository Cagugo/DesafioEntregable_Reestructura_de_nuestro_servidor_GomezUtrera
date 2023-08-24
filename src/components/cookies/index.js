const CustomRouter = require('../../routes/router');
const cookiesController = require('./cookiesController/cookiesController');

class Cookies extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/api/sessions';

    this.get(`${basePath}/setsignedcookies`, cookiesController.setSignedCookies);
    this.get(`${basePath}/getsignedcookies`, cookiesController.getSignedCookies);
    this.get(`${basePath}/deletesignedcookies`, cookiesController.deleteSignedCookies);
  }
}
module.exports = new Cookies();
