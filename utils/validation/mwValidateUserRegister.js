/////////////////////////////////////////////////////////////////////////////
// NOTE: THIS MIDDLE DOES NOT WORK this validator requires app.use(expressValidator()) in the server //
// const { check, validationResults } = require('express-validator');      //
/////////////////////////////////////////////////////////////////////////////
exports.mwValidateUserRegister = (req, res, next) => {
    check("name", "É preciso um nome")
    check("email", "Email deve ter de 4 a 32 characteres")

        .isLength({
            min: 4,
            max: 32
        });
    check("password", "A senha é obrigatória")
    check("password")
        .isLength({ min: 6 })
        .withMessage("A senha dever conter pelo menos 6 characteres")
        .matches(/\d/)
        .withMessage("A senha deve conter, pelo menos, um número.");
    const errors = req.validationResults();
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array() });
    }
    next();
};
