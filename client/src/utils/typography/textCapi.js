import React from 'react';

export default function textCapi(text) {
    if (text) {
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
}
