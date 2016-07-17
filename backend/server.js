var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8001, function(){
    console.log('Backend server running on 8001...');
});