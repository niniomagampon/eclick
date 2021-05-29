const withErrors = (obj) => {
  if ("errors" in obj) {
    let errors = {};
    obj.errors.map((err) => (errors[err.path] = err.message));

    return errors;
  }
};

module.exports = withErrors;
