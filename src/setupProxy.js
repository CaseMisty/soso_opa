const proxy = require('http-proxy-middleware');
console.log('setupProxy')
module.exports = function(app) {
    app.use(proxy('/webapi', 
        { 
            target: 'http://opttest.soso-code.com',
            secure: false,
            changeOrigin: true
        }
    ));
}