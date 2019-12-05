const removeDiacritics = require('./removeDiacritics');
// This will be the SKU
const generateRefCode = productName => {
    productName = removeDiacritics(productName);
    let abbrev = productName.split(" ").map(each => {
        return each.substr(0, 1).toUpperCase();
    });

    return abbrev.join("");
};

module.exports = generateRefCode;