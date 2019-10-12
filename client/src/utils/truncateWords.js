import React from 'react';

export default function truncateWords(input, maxWidth) {
        return input.length > maxWidth ?
        input.substring(0, maxWidth) + '...' :
        input;
}