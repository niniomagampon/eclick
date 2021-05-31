
const loggedInSession = (req) => {
    req.session.isLoggedIn = undefined;
    req.session.username = undefined;
    req.session.errors = [];
  };
  
  module.exports = loggedInSession;