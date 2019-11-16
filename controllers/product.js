const Product = require('../models/Product');
const { mwAuth } = require('../controllers/auth');

// MESSAGES
const msgs = {
    deleted: "O produto foi deletado com sucesso!",
    alreadyPosted: "O produto já foi postado!",
    notFound: "O produto não foi encontrado ou já foi deletado",
    systemError: "Ocorreu o seguinte erro: "
}
// END MESSAGES

// MIDDLEWARES
exports.mwProductId = (req, res, next, id) => {
    //
}
// END MIDDLEWARES

// CRUD
exports.create = (req, res) => { //needs to put mwAuth as middleware
    const title = req.body.title;
    Product.findOne({ title })
    .then(product => {
        if(product) return res.status(404).json({ msg: msgs.alreadyPosted })

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
    .catch(err => res.status(404).json({ msg: `${msgs.systemError}${err}` }));
}

exports.remove = (req, res) => { // needs mwAuth
    Product.findById(req.params.id)
    .then(product => {
        if(!product) return res.status(404).json({msg: msgs.notFound});

        product.remove().then(() => res.json({ msg: msgs.deleted }))
    })
    .catch(err => res.status(404).json({ msg: `${msgs.systemError}${err}` }));
}


// END CRUD

// FIELD UPDATE HANDLING
// Change/Add a primaryfield, e.g req.body = { "title": "new product"}
exports.updatePrimaryField = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not added"})
        }
        // data.save();
        res.json(data);
    });
}
// END FIELD UPDATE HANDLING

// LISTS
// need to be changed
exports.read = (req, res) => {
    Product.find({})
        .sort({ systemDate: -1 }) // ordered descending - most recently
        .then(products => res.json(products))
}
// END LISTS