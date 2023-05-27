export function isAdmin(req, res, next){
    if (req.user && req.user.isAdmin) {
        next();
      } else {
        const customError = new Error('Usuario no autorizado');
        customError.id = 4;
        next(customError);
      }
}
export function adminWithoutAccess(req, res, next) {
  const user = req.user;

  if (user.isAdmin) {
    const error = new Error('Tienes el Acceso Prohibido a las compras por ser administrador');
    error.status = 403;
    error.id = 403; 
    error.message = 'Tienes el Acceso Prohibido a las compras por ser administrador'; 
    throw error; 
  }
  next();
}