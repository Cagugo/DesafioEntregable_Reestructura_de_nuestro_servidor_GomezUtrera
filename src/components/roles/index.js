const CustomRouter = require('../../routes/router'); 
const rolesController = require('./rolesController/rolesController');

class RolesRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/api/sessions';

    this.get(`${basePath}/admintest`, rolesController.getAdmin);
    this.get(`${basePath}/usertest`, rolesController.getUser);
  }
}
module.exports = new RolesRoutes();
