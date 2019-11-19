const Product = require('../../models/product');
const ProductInfo = require('../../models/product/ProductInfo');
const { mwAuth } = require('../../controllers/auth');
const formidable = require('formidable');
const fs = require('fs');

// MESSAGES
const ok = {
    deleted: "O produto foi deletado com sucesso!",
}
const error = {
    allFieldsRequired: "Preencha todos os campos",
    photoRequired: "Você precisa de, pelo menos, uma foto do produto",
    largeImg: "A imagem deve ser menos de 1mb de tamanho",
    alreadyPosted: "O produto já foi postado.",
    notStored: "A imagem não pôde ser armazenada. Tente novamente!",
    notUpdated: "O produto não pôde ser atualizado.",
    notFound: "O produto não foi encontrado ou já foi deletado",
    noCategories: "Não foram encontradas a lista de categorias",
    systemError: "Ocorreu o seguinte erro: "
}
const msg = (text, systemError = "") => ({ msg: text + systemError});
// END MESSAGES

// MIDDLEWARES
exports.mwPhoto = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.mwProductId = (req, res, next, id) => {
    Product.findById(id)
    .populate("category info")
    .exec((err, product) => {
        if (err || !product) return res.status(400).json(msg(error.notFound));

        req.product = product;
        next();
    });
}
// END MIDDLEWARES

// CRUD
exports.create = (req, res) => { // n3 - needs mwAuth
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => { // fields from doc
        if (err) return res.status(400).json(msg(error.notStored));

        const { category, title, price, quantity } = fields

        Product.findOne({ title })
        .exec((err, user) => {
            if(err) return res.status(400).json(msg(error.systemError, err))
            if(user) return res.status(400).json(msg(error.alreadyPosted))

            if (!category || !title || !price || !quantity) {
                return res.status(400).json(msg(error.allFieldsRequired))
            }

            let product = new Product(fields);

            // Photo File Size Reference
            // 1kb = 1000
            // 1mb = 1.000.000

            if (files.photo) {
                if (files.photo > 1000000) {
                    return res.status(400).json(msg(error.largeImg))
                }
                product.photo.data = fs.readFileSync(files.photo.path); // provide media info
                product.photo.contentType = files.photo.type;
            } else {
                return res.status(400).json(msg(error.photoRequired))
            }

            product.save((err, result) => {
                if (err) return res.status(400).json(msg(error.systemError, err));
                res.json(result);
            });
        })
    });
};


exports.read = (req, res) => {
    req.product.photo = undefined;
    req.product.isReadyToPopulate = undefined;
    return res.json(req.product);
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).json(msg(error.notUpdated));
        let product = req.product;
        // merging new fields with the current  product
        product = Object.assign(product, fields);
        console.log(product);
        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json(msg(error.largeImg));
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) return res.status(400).json(msg(error.systemError, err));
            res.json(result);
        });
    });
};

exports.remove = (req, res) => { // needs mwAuth
    Product.findById(req.product._id)
    .then(product => {
        if(!product) return res.status(404).json(msg(error.notFound));
        product.remove((err, deleted) => {
            if(err) return res.status(404).json(msg(error.systemError, err));
            res.json(msg(ok.deleted));
        })
    })
    .catch(err => res.status(404).json(msg(error.systemError, err)));
}
// END CRUD

// ADDITIONAL CRUD
// productInfo and product will have the same ID
exports.updateProductInfo = (req, res) => {
    const productObj = req.product;
    const productId = productObj._id;
    const infoKey = { info: productId, isReadyToPopulate: true };
    // update info with obj so that we can populate with productInfoSchema.
    // After that, create or update the productInfo

    // add new id to product only if not ready to populate yet
    if(!productObj.isReadyToPopulate) {
        Product.findOneAndUpdate(
            { _id: productId },
            { $set: infoKey },
            { new: true }, // n4
            (err, product) => {
                if (err) return res.status(400).json(msg(error.systemError, err));
            }
        )
    }

    ProductInfo.findOneAndUpdate(
        { _id: productId },
        { $set: req.body },
        { strict: false, new: true, upsert: true }, // n4
        (err, productInfo) => {
            if (err) return res.status(400).json(msg(error.systemError, err));
            res.json(productInfo);
        }
    );
};
// END ADDITIONAL CRUD

// LISTS
exports.getList = (req, res) => { // n2
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 12; // default

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) return res.status(400).json(msg(error.notFound));
            res.json(products);
        });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */
exports.getListRelated = (req, res) => {
    console.log("getList Related req product", req.product)
    const selectedProduct = req.product;
    let limit = req.query.limit ? parseInt(req.query.limit) : 6; // 6 by default
    // find this current category from the selected product but not include itself
    Product.find({ _id: { $ne: selectedProduct }, category: selectedProduct.category }) //n1
    .limit(limit)
    .select('-photo') // activate this for better readability in postman
    .populate("category", "_id name")
    .populate("info")
    .exec((err, products) => {
        if (err) return res.status(400).json(msg(error.notFound));
        res.json(products);
    });
};

// unique categories created for all products
exports.getListCategory = (req, res) => {
    Product.distinct("category", {}, (err, categories) => { // n2
        if (err) return res.status(400).json(msg(error.noCategories));
        res.json(categories);
    });
};
// END LISTS


/* COMMENTS
n1: // we do not fetch images due to their big size, there is another way in the front end to fetch them.
n2:
 * sales (most popular products) / arrival (new products)
 * by sales = api/product/list/all?sortBy=sold&order=desc&limit=4
 * by arrival = api/product/list/all?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned

n3: prior create
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

n4: strict=false is necessary to avoid mongoDB error because the id does not exist in this Collection.
n5: $ne - not included operator (because we do not want to return the targeted selected id product)
*/