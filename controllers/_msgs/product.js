const productMsgs = { ok: {}, error: {}};
const { ok, error } = productMsgs;

const msg = (typeAndMsgName, customized = 'NeedCustomWord', options) => {
    const isOnlyMsg = `${customized}${options}`.includes("onlyMsg");

    const checkIfNotString = typeof customized !== 'string';
    checkIfNotString
    ? customized = JSON.stringify(customized).cap()
    : customized = customized.cap()

    const [type, msgName] = typeAndMsgName.split(".");
    let foundMsg;

    // MESSAGES
    ok.deleted = `O produto (${customized}) foi deletado com sucesso!`;
    error.alreadyPosted = "O produto já foi postado.";
    error.noCategory = "Insira a categoria do produto";
    error.largePhoto = "A imagem deve ser menos de 1mb de tamanho";
    error.noCategoryList = "Não há lista de Categorias";
    error.noPhoto = "Você precisa de, pelo menos, uma foto do produto";
    error.noTitle = "Insira o título do produto";
    error.noPrice = "Insira o preço do produto";
    error.notStored = "A imagem não pôde ser armazenada. Tente novamente!";
    error.notUpdated = "O produto não pôde ser atualizado.";
    error.notFound = "O produto não foi encontrado ou já foi deletado";
    error.noCategories = "Não foram encontradas a lista de categorias";
    // END MESSAGES

    foundMsg = productMsgs[type][msgName];
    const needThrowErr = foundMsg.includes('NeedCustomWord');
    if(needThrowErr) throw new Error('It is required a customized string');

    if(isOnlyMsg) return foundMsg;
    return ({ msg: foundMsg });
}

module.exports = {
    msg
}
