class SessionsServices {
  getSession = async (req, res) => {
    try {
      if (req.session.counter) {
        req.session.counter++;
        return res.status(200).json({ success: true, message: `The site has been visited ${req.session.counter} Times.` });
      } else {
        req.session.counter = 1;
        return res.status(200).json({ success: true, message: 'Welcome VF' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error getSession' });
    }
  };
  deleteSession = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (!err) {
          return res.status(200).json({ success: true, message: 'Logout Ok!' });
        } else {
          return res.status(500).json({ success: false, error: 'Logout ERROR', body: err });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error deleteSession' });
    }
  };
}
module.exports = new SessionsServices();
