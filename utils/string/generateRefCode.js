//need insert according to the number of categories too.

const generateRefCode = productName => {
    let abbrev = productName.split(" ").map(each => {
        return each.substr(0, 1).toUpperCase();
    });

    return abbrev.join("");
};

module.exports = generateRefCode;