export function checkVIP(req, res, next) {
    if (req.user && req.user.isVIP()) {
      next();
    } else {
      const customError = new Error('Usuario no autorizado');
      customError.id = 4;
      next(customError);
    }
  }