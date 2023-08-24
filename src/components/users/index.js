const CustomRouter = require('../../routes/router');
const usersController = require('./usersController/usersController');
const { validateUserId } = require('../../utils/routes/routerParams');

class UsersRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('uid', validateUserId);

    const basePath = '/api/session/useradmin';

    this.get(`${basePath}/`, usersController.getUsers);
    this.post(`${basePath}/recovery`, usersController.recoveryUser);
    this.get(`${basePath}/:uid`, usersController.getUserById);
    this.put(`${basePath}/:uid`, usersController.updateUser);
    this.delete(`${basePath}/:uid`, usersController.deleteUser);
  }
}
module.exports = new UsersRoutes();
