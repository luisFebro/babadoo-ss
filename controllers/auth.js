const jwt = require('jsonwebtoken');

// MESSAGES
const ok = {
}
const error = {
    accessDenied: "Oops! Você não permissão para acessar esta página",
    systemError: "Ocorreu o seguinte erro: "
}
const msg = (text, systemError = "") => ({ msg: text + systemError});
// END MESSAGES

// MIDDLEWARES
exports.mwIsAdmin = (req, res, next) => {
    // if regular user, then deny access.
    if (req.profile.isAdmin === false) {
        return res.status(403).json(msg(error.accessDenied));
    }
    next();
};

// NOT SENDING RESPONSE !!!
exports.mwAuth = (req, res, next) => {  // n1
  const token = req.header('x-auth-token');

  // Check for token if it exists
  if (!token)
    return;
    // res.status(401).json({ msg: 'Ocorreu um erro. Mas tente fazer seu acesso normalmente...' }); //Sem token, autorização negada

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json(msg(error.systemError))
  }
}
// END MIDDLEWARES


/* COMMENTS
n1:
/*this middleware is created so that
we can have private routes that are only
accessed if we send along the token from routes/api/auth*/

/*The purpose of this function here is to get
the token that's sent from either react
or postman angular whatever front-end
you're using where it's gonna send along
a token*/
