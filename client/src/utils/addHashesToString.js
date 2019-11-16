// replace globally any space or symbols like @, not including (_, a-Z, 0-9)
exports function addDashesToString(string) {
    return string.replace(/(\s|\W)/gi, "-").toLowerCase();
}
