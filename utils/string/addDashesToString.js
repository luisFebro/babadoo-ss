// remove all diacritics (acentos pt-br), then replace globally any space or symbols like @, not including (_, a-Z, 0-9)
function addDashesToString(string) {
    const withNoDiacritics = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // n1
    return withNoDiacritics.replace(/(\s|\W)/gi, "-").toLowerCase();
}

module.exports = addDashesToString;

/* COMMENTS
n1:
diacritics: ÄÅÁÂÀÃäáâàãÉÊËÈéêëèÍÎÏÌíîïìÖÓÔÒÕöóôòõÜÚÛüúûùÇç
Two things are happening here:
normalize()ing to NFD Unicode normal form decomposes combined graphemes into the combination of simple ones. The è of Crème ends up expressed as e + ̀.
Using a regex character class to match the U+0300 → U+036F range, it is now trivial to globally get rid of the diacritics, which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
ref: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
*/
