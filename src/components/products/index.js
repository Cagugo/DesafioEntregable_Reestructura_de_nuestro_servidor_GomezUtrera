const CustomRouter = require('../../routes/router');
const productsController = require('./productsController/productsController');
const upload = require('../../utils/multer/multer');
const { validateProductId } = require('../../utils/routes/routerParams');

class ProductsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('pid', validateProductId);

    const basePath = '/api/products';

    this.get(`${basePath}/`, productsController.getAllProducts);
    this.get(`${basePath}/:pid`, productsController.getProductById);
    this.put(`${basePath}/:pid`, productsController.updateProduct);
    this.delete(`${basePath}/:pid`, productsController.deleteProduct);
    this.post(`${basePath}/`, upload.array('image', 5), productsController.addProduct);
  }
}
module.exports = new ProductsRoutes();
