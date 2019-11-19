const Product = require('../../models/product');

// MESSAGES
const ok = {
}
const error = {
    systemError: "Ocorreu o seguinte erro: "
}
const msg = (text, systemError = "") => ({ msg: text + systemError });
// END MESSAGES

exports.read = (req, res) => {
    const favoriteArray = req.body.favoriteArray;
    Product.find()
    .where('_id')
    .in(favoriteArray)
    .exec((err, records) => {
        if(err) return res.status(400).json(msg(error.systemError));
        res.json(records);
    });

}