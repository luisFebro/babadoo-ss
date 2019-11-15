function textCapi(text) {
    if(text) {
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
}

module.exports = textCapi;