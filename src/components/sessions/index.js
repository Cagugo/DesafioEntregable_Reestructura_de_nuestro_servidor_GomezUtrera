const CustomRouter = require('../../routes/router');
const sessionsController = require('./sessionsController/sessionsController');

class SessionsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/api/sessions'; 
    this.get(`${basePath}/session`, sessionsController.getSession);
    this.get(`${basePath}/deletesession`, sessionsController.deleteSession);
  }
}
module.exports = new SessionsRoutes();
