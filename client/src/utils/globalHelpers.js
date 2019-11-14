import React from 'react';
import textCapi from './typography/textCapi';
import isRealObj from './isRealObj';

// These functions will be available in any part of the app because they can be useful for any component
window.Helper = {};
window.Helper.textCapi = textCapi;
window.Helper.isRealObj = isRealObj;
