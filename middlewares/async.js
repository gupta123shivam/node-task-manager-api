const asyncWrapper = (callbackFn) => {
  return async (req, res, next) => {
    try {
      await callbackFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = asyncWrapper;
