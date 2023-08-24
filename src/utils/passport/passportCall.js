const passport = require('passport');
const passportCall = (strategy) => {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    passport.authenticate(strategy, function (err, user, info) {
      if (err) {
        console.error('Failed to authenticate with passportCall:', err);
        return next(err);
      }
      if (!user) {
        console.log('User not authenticated with passportCall:', info.messages ? info.messages : info.toString());
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      console.log('User authenticated with passportCall:', user);
      next();
    })(req, res, next);
  };
};
module.exports = passportCall;
