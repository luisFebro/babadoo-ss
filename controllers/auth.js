const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateEmail = require('../utils/validation/validateEmail');

// MESSAGES
// MESSAGES
const ok = {}
const error = {
    notAuthorized: "Você não está autorizado para executar esta ação",
    notFound: "O usuário não foi encontrado",
    allFieldsRequired: 'Por favor, entre todos os campos',
    invalidEmail: "Email Inválido. Tente outro.",
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
    const token = req.header('x-auth-token');

    // Check for token if it exists
    if(!token)
        return;
    // res.status(401).json({ msg: 'Ocorreu um erro. Mas tente fazer seu acesso normalmente...' }); //Sem token, autorização negada

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
    } catch (err) {
        res.status(400).json(msg(error.systemError))
    }
    next();
}
// END MIDDLEWARES

exports.login = (req, res) => {
    const { email, name, password } = req.body;
    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Por favor, insira todos os campos' });
    }

    // Check Login for existing user by Name or Email
    User.findOne({ $or: [{ name }, { email }] })
        .then(user => {
            console.log("user", user);
            //user returns the whole obj of the user, otherwise "null"
            if(!user) return res.status(400).json({ msg: 'Sem Registro do Usuário' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Credenciais Inválidas' });

                    jwt.sign({ id: user._id },
                        process.env.JWT_SECRET, { expiresIn: '7d' }, //7 days - "expiresIn" should be a number of seconds or string that repesents a timespan eg: "1d", "20h",
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
}

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

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
            password
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
                                const { _id, name, email } = user
                                res.json({
                                    token,
                                    user: {
                                        id: _id,
                                        name,
                                        email,
                                    }
                                });
                            }
                        )
                    });
            })
        })
    } catch (err) {
        return res.status(400).json(msg(error.systemError, err))
    }
}

exports.checkUserAuth = (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
        .select('-password')
        .exec((err, user) => {
            if(err) return res.status(400).json(msg(error.systemError, err))
            res.json(user);
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