import React from 'react';
import isRealObj from './isRealObj';

// GLOBAL PROTOTYPE METHODS n1
// Typography
// Need to be function syntax, otherwise this will return undefined.
let brPreps = ["seu", "sua", "pela", "via", "por", "com", "no", "na", "da", "do", "das", "dos", "a", "e", "de", "de"];
String.prototype.cap = function() {
    let capitalized = this.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    let splittedWords = capitalized.split(' ');
    let readyString = splittedWords.map(word => {
        if(brPreps.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }
        return word;
    }).join(' ');

    return readyString;
};
// END GLOBAL PROTOTYPE METHODS


// These functions will be available in any part of the app because they can be useful for any component
window.Helper = {};
window.Helper.isRealObj = isRealObj;


/* COMMENTS
n1: These methods are global and they can be used everywhere and import globally
prior: window.Helper.textCapi = textCapi;
*/
