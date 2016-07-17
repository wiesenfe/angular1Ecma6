// Load spec files for testing
var context = require.context('../src', true, /Specs.js$/); 
context.keys().forEach(context);