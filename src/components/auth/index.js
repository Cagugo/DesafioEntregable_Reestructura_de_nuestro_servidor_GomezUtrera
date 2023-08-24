const CustomRouter = require('../../routes/router');
const authController = require('./authController/authController');

class Auth extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/api/session/auth';

    this.router.use(basePath, (req, res, next) => {
      console.log('Middleware for authentication routes');
      next();
    });

    this.post(`${basePath}/register`, authController.register);
    this.post(`${basePath}/login`, authController.login);

    this.get(`${basePath}/github`, authController.githubLogin);
    this.get(`${basePath}/githubcallback`, authController.githubCallback, authController.githubCallbackRedirect);

    this.get(`${basePath}/logout`, authController.logout);
  }
}
module.exports = new Auth();
