
const { User } = require('../../../models/users');
const JWTService = require('../../../utils/jwt/jwt');
const { createHash, isValidPassword } = require('../../../utils/bcrypt/bcrypt');
const { Cart } = require('../../../models/carts');
const { config } = require('../../../config');

class AuthServices {
  register = async (payload, res) => {
    try {
      const { first_name, last_name, email, age, password } = payload;

      if (!first_name || !last_name || !email || !age || !password) {
        return res.status(500).json({ success: false, error: 'Missing required fields' });
      }
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'There is already a user with the same email' });
      }
      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      });
      await newUser.save();

      const userCart = new Cart({
        user: newUser._id,
        products: [],
      });
      await userCart.save();

      newUser.cart = userCart._id;
      await newUser.save();

      const data = newUser;
      const token = await JWTService.generateJwt({ id: newUser._id });
      let updatedUser = await User.findByIdAndUpdate(newUser._id, { token }, { new: true });
      console.log('~~~User registrado~~~', updatedUser);
      return res.status(201).json({ success: true, message: 'User added successfully', ...newUser.toObject(), token, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error adding user' });
    }
  };

  login = async ({ email, password, isAdminLogin }) => {
    try {
      if (isAdminLogin) {
        const adminUser = {
          email: config.admin_email,
          admin: true,
          role: 'admin',
        };
        return { status: 200, response: adminUser, isAdminLogin: false };
      } else {
        let user = await User.findOne({
          email: email,
        });

        if (!user) {
          console.log('The user does not exist in the database');
          return { status: 401, response: 'The user does not exist in the database' };
        }

        if (!isValidPassword(password, user)) {
          console.log('Invalid Credentials');
          return { status: 403, response: 'Invalid Credentials' };
        }

        console.log('Login with valid Jason Web Token', user);
        return { status: 200, response: user, isAdminLogin: false };
      }
    } catch (error) {
      console.log(error);
      return { status: 500, response: 'Server Error' };
    }
  };
  logout = async (req, res) => {
    try {
      res.clearCookie('jwt');
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            const response = { success: false, error: err };
            req.logoutResult = response;
            reject(response);
          } else {
            const response = { success: true, message: 'Logout successful' };
            req.logoutResult = response;
            resolve(response);
          }
          console.log('Logout successful');
        });
      });
      return req.logoutResult;
    } catch (err) {
      const response = { success: false, error: 'Error during logoff' };
      req.logoutResult = response;
      return response;
    }
  };
}
module.exports = new AuthServices();
