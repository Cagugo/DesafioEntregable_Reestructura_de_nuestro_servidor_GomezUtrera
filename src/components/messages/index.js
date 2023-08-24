const CustomRouter = require('../../routes/router');
const messagesController = require('./messagesController/messagesController');
const { validateMessageId } = require('../../utils/routes/routerParams');

class Messages extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('mid', validateMessageId);

    const basePath = '/api/chat';

    this.get(`${basePath}/`, messagesController.getAllMessages);
    this.post(`${basePath}/`, messagesController.addUserMessage);
    this.delete(`${basePath}/:mid`, messagesController.deleteUserMessage);
  }
}
module.exports = new Messages();
