
const jwt = require('jsonwebtoken');

const SECRET = "motSecret";

const isAuth = (request, response, next) => {
  const token = request.cookies.authcookie;

  jwt.verify(token, SECRET, (error, user) => {
    if (error) {
      response.send(error.message);
    } else {
      const { id, username, city,exp } = user;

      // Useless or not ?!
      if (Date.now() / 1000 >= exp) {
        response.clearCookie("authcookie");
        response.send("Session expired. Try to reconnect you.");
      }

      request.user = { id, username,city };
      next();
    }
  })
};

module.exports = isAuth;