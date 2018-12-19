const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/webapi', 
        { target: 'http://opttest.soso-code.com/' }
    ));
}