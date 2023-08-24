const CustomRouter = require('../../routes/router');
const passportCall = require('../../utils/passport/passportCall');
const { authorization } = require('../../utils/auth/auth');
const { validateCartId } = require('../../utils/routes/routerParams');

class HandlebarsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.param('cid', validateCartId);
    this.get('/', handlebarsController.getLogin);
    this.get('/register', handlebarsController.getRegister);
    this.get('/recovery', handlebarsController.getRecovery);
    this.get('/products', passportCall('jwt'), authorization(['user']), handlebarsController.getProducts);
    this.get('/carts/:cid', passportCall('jwt'), authorization(['user']), handlebarsController.getCartProductById);
    this.get('/user', passportCall('jwt'), authorization(['user']), handlebarsController.getUser);
    this.get('/current', passportCall('jwt'), authorization(['user', 'admin']), handlebarsController.getCurrent);
    this.get('/admin', passportCall('jwt'), authorization(['admin']), handlebarsController.getAdmin);
    this.get('/home', handlebarsController.getHome);
    this.get('/realtimeproducts', handlebarsController.getRealTimeProducts);
    this.get('/chat', handlebarsController.getChat);
  }
}
module.exports = new HandlebarsRoutes();
