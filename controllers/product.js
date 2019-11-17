const Product = require('../models/Product');
const { mwAuth } = require('../controllers/auth');

// MESSAGES
const ok = {
    deleted: "O produto foi deletado com sucesso!",
}
const error = {
    alreadyPosted: "O produto já foi postado!",
    notUpdated: "O produto não foi atualizado!",
    notFound: "O produto não foi encontrado ou já foi deletado",
    systemError: "Ocorreu o seguinte erro: "
}
const msg = (text, systemError = "") => ({ msg: text + systemError});
// END MESSAGES

// MIDDLEWARES
exports.mwProductId = (req, res, next, id) => {
    Product.findById(id) // .populate("category")
    .exec((err, product) => {
        if (err || !product) return res.status(400).json(msg(error.notFound));

        req.product = product;
        next();
    });
}
// END MIDDLEWARES

// CRUD
exports.create = (req, res) => { //needs to put mwAuth as middleware
    const title = req.body.title;
    Product.findOne({ title })
    .then(product => {
        if(product) return res.status(404).json(msg(error.alreadyPosted))

        const newProduct = new Product({
            title: req.body.title, //required
            description: req.body.description, //required
            image: req.body.image,
            price: req.body.price, //required
            company: req.body.company,
            info: req.body.info,
            inCart: req.body.inCart,
            isAddedToFav: req.body.isAddedToFav,
            count: req.body.count,
            total: req.body.total,
        });

        newProduct.save().then(product => res.json(product));
    })
    .catch(err => res.status(404).json(msg(error.systemError, err)));
}

exports.read = (req, res) => {
    // n1 req.product.photo = undefined;
    return res.json(req.product);
}

exports.remove = (req, res) => { // needs mwAuth
    Product.findById(req.params.id)
    .then(product => {
        if(!product) return res.status(404).json(msg(error.notFound));

        product.remove().then(() => res.json(msg(ok.deleted)))
    })
    .catch(err => res.status(404).json(msg(error.systemError, err)));
}
// END CRUD

// LISTS
exports.getList = (req, res) => { // n2
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 12; // default

    Product.find()
        // .select("-photo")
        // .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) return res.status(400).json(msg(error.notFound));
            res.json(products);
        });
};
// need to be changed
// exports.read = (req, res) => {
//     Product.find({})
//         .sort({ systemDate: -1 }) // ordered descending - most recently
//         .then(products => res.json(products))
// }
// END LISTS

// FIELD UPDATE HANDLING
// Change/Add a primaryfield, e.g req.body = { "title": "new product"}
exports.updatePrimaryField = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json(msg(error.notUpdated))
        }
        // data.save();
        res.json(data);
    });
}
// END FIELD UPDATE HANDLING

/* COMMENTS
n1: // we do not fetch images due to their big size, there is another way in the front end to fetch them.
n2:
 * sales (most popular products) / arrival (new products)
 * by sales = api/product/list/all?sortBy=sold&order=desc&limit=4
 * by arrival = api/product/list/all?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
*/