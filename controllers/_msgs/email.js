const emailMsgs = { ok: {}, error: {} };
const { ok, error } = emailMsgs;

const msg = (typeAndMsgName, customized = 'NeedCustomWord', options) => {
    const isOnlyMsg = (customized || options) === 'onlyMsg';
    customized = customized.cap();

    const [type, msgName] = typeAndMsgName.split(".");
    let foundMsg;

    // MESSAGES
    ok.sent = "Mail sent successfully.";
    ok.confirm = 'Um email de confirmação foi enviado para você.';
    ok.confirmed = 'Seu Email foi confimado com sucesso!';
    ok.resend = 'Email de Confirmação Reenviado, verifique também sua caixa de spam';
    ok.successBuyRequest = "Pedido registrado e enviado com sucesso! Acompanhe o andamento pela sua conta de acesso!";
    error.notSent = "Email não foi enviado!";
    error.notRegistered = "Esse email não foi registrado. Verique se digitou corretamente.";
    error.couldNotFind = 'Não encontramos você!';
    error.alreadyConfirmed = '';
    // Form
    error.anyFieldFilled = "Preencha todas os campos";
    error.noName = "Por favor, insira seu nome";
    error.noContact = "Por favor, insira seu whatsapp";
    error.noAddress = "Por favor, insira seu endereço";
    error.wrongFormatNumber = "Você digitou um formato de número errado";
    // END MESSAGES

    foundMsg = emailMsgs[type][msgName];
    const needThrowErr = foundMsg.includes('NeedCustomWord');
    if(needThrowErr) throw new Error('It is required a customized string');

    if(isOnlyMsg) return foundMsg;
    return ({ msg: foundMsg });
}

module.exports = {
    msg
}
