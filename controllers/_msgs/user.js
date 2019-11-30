const userMsgs = { ok: {}, error: {}};
const { ok, error } = userMsgs;

const msg = (typeAndMsgName, customized = 'NeedCustomWord', options) => {
    const isOnlyMsg = `${customized}${options}`.includes("onlyMsg");
    customized = customized.cap();

    const [type, msgName] = typeAndMsgName.split(".");
    let foundMsg;

    // MESSAGES
    ok.userDeleted = `O usuário ${customized.cap()} foi excluído com sucesso`;
    ok.userConfirmed = `Bem vindo(a) à bordo, ${customized.cap()}! Sua conta foi registrada com sucesso.`;
    error.notFound = "O usuário não foi encontrado";
    error.userAlreadyConfirmed = "O usuário já foi cadastrado com esse link";
    error.notFoundConfirmation = "Esse link não é válido ou o usuário não está registrado";
    // END MESSAGES

    foundMsg = userMsgs[type][msgName];
    const needThrowErr = foundMsg.includes('NeedCustomWord');
    if(needThrowErr) throw new Error('It is required a customized string');

    if(isOnlyMsg) return foundMsg;
    return ({ msg: foundMsg });
}

module.exports = {
    msg
}