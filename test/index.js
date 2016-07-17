// Load spec files for testing
var context = require.context('../src', true, /Spec.js$/); 
context.keys().forEach(context);