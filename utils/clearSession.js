const clearSession = (req) => {
  req.session.isSuccess = undefined;
  req.session.errors = [];
};

module.exports = clearSession;