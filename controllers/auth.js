const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateEmail = require('../utils/validation/validateEmail');

// MESSAGES
// MESSAGES
const ok = {}
const error = {
    jwtNotFound: "JWT token não foi encontrado",
    notAuthorized: "Você não está autorizado para executar esta ação",
    notFound: "Sem registro. O usuário não foi encontrado",
    allFieldsRequired: 'Por favor, insira todos os campos',
    invalidEmail: "Email Inválido. Tente outro.",
    invalidCredentials: "Credenciais Inválidas",
    userAlreadyRegistered: 'Esse Nome de usuário já foi registrado. Tente um outro.',
    emailAlreadyRegistered: 'Esse Email já foi registrado. Tente um outro.',
    notEnoughCharacters: 'Sua senha deve conter pelo menos 6 dígitos',
    systemError: "Ocorreu o seguinte erro: "
}
const msg = (text, systemError = "") => ({ msg: text + systemError });
// END MESSAGES

// MIDDLEWARES
exports.mwIsAdmin = (req, res, next) => {
    // if regular user, then deny access.
    if(req.profile.isAdmin === false) {
        return res.status(403).json(msg(error.accessDenied));
    }
    next();
};

// NOT SENDING RESPONSE !!!
exports.mwAuth = (req, res, next) => { // n1
    const token = req.header('x-auth-token'); // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjQzMDFlZDM5YTRlMTI1NDYyNzdhOCIsImlhdCI6MTU3NDIxMDUwNCwiZXhwIjoxNTc0ODE1MzA0fQ.HAUlZ6lCHxRuieN5nizug_ZMTEuAmJ2Ck22uCcBkmeY"

    // Check for token if it exists
    if(!token) return console.log(error.jwtNotFound); //Sem token, autorização negada

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.authObj = decoded; // eg we got this id to process in checkUserAuth { id: '5db4301ed39a4e12546277a8', iat: 1574210504, exp: 1574815304 } // iat refers to JWT_SECRET. This data is generated from jwt.sign
    } catch (err) {
        res.status(400).json(msg(error.jwtNotFound, err))
    }
    next();
}
// END MIDDLEWARES
// this will load the authorized user's data after and only if the token is valid in mwAuth
exports.loadAuthUser = (req, res) => {
    const userId = req.authObj.id;
    User.findById(userId)
        .select('-password')
        .exec((err, profile) => {
            if(err) return res.status(400).json(msg(error.systemError, err))
            res.json({ profile });
        })
}

exports.register = async (req, res) => {
    const { name, email, password, registeredBy } = req.body;

    // VALIDATION
    // Check if fields are filled
    if(!name || !email || !password) return res.status(400).json(msg(error.allFieldsRequired));
    // Check if the email is valid
    if(!validateEmail(email)) return res.status(400).json(msg(error.invalidEmail)) // Check the length of password
    if(password.length < 6) {
        return res.status(400).json(msg(error.notEnoughCharacters))
    }
    // END VALIDATION

    try {
        // Check Register for existing user for either already registered email or name.
        const user = await User.findOne({ $or: [{ email }, { name }] })
        // Check if these email/name were already registered, if so indicate which case already was registered.
        if(user) {
            if(user.name === name) return res.status(400).json(msg(error.userAlreadyRegistered));
            if(user.email === email) return res.status(400).json(msg(error.emailAlreadyRegistered));
            return res.status(400).json(msg(error.allFieldsRequired));
        }

        const newUser = new User({
            name,
            email,
            password,
            registeredBy
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign({ id: user._id },
                            process.env.JWT_SECRET, { expiresIn: '7d' }, //7 days - "expiresIn" should be a number of seconds or string that repesents a timespan eg: "1d", "20h",
                            (err, token) => {
                                if(err) throw err;
                                const { _id } = user
                                res.json({ token, authUserId: _id });
                            }
                        )
                    });
            })
        })
    } catch (err) {
        return res.status(400).json(msg(error.systemError, err))
    }
}

exports.login = (req, res) => {
    const { email, name, password } = req.body;
    // Simple validation
    if(!email || !password) {
        return res.status(400).json(msg(error.allFieldsRequired));
    }

    // Check Login for existing user by Name or Email
    User.findOne({ $or: [{ name }, { email }] })
        .then(user => {
            const { _id } = user;
            //user returns the whole obj of the user, otherwise "null"
            if(!user) return res.status(400).json(msg(error.notFound));

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json(msg(error.invalidCredentials));

                    jwt.sign({ id: _id },
                        process.env.JWT_SECRET, { expiresIn: '7d' }, //7 days - "expiresIn" should be a number of seconds or string that repesents a timespan eg: "1d", "20h",
                        (err, token) => {
                            if(err) throw err;
                            res.json({ token, authUserId: _id });
                        }
                    )
                })
        })
}


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