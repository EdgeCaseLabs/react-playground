// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var pkg = require('./package')

var routes = require('./src/routes');

var app = express();

var ip = '0.0.0.0';
app.set('ip', ip);
app.set('port', pkg.config['express-port']);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var webpack = require("webpack");
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
app.use(require('webpack-hot-middleware')(compiler));

// we only want hot reloading in development
if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');

    var WebpackDevServer = require("webpack-dev-server");
    var port = pkg.config['webpack-dev-port'];
    var server = new WebpackDevServer(compiler, {
      // webpack-dev-server options

      contentBase: webpackConfig.output.path,
      // or: contentBase: "http://localhost/",

      hot: true,
      // Enable special support for Hot Module Replacement
      // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
      // Use "webpack/hot/dev-server" as additional module in your entry point
      // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

      // Set this as true if you want to access dev server from arbitrary url.
      // This is handy if you are using a html5 router.
      historyApiFallback: true,

      // Set this if you want to enable gzip compression for assets
      //compress: true,

      // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
      // staticOptions: {
      // },

      // webpack-dev-middleware options
      // quiet: false,
      noInfo: true,
      // lazy: true,
      filename: path.resolve(webpackConfig.output.path, webpackConfig.output.filename),
      publicPath: webpackConfig.output.publicPath,
      headers: { "Access-Control-Allow-Origin": "*" },
      stats: { colors: true }
    });
    server.listen(port, ip, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('Webpack dev server listening at ' + ip + ':' + port);
    });

} else {
    console.log('PRODUCTION ENVIRONMENT');

    //Production needs physical files! (built via separate process)
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use(express.static(path.join(__dirname, 'static')));



// API Calls

/**
 * GET /api/altdatademo/
 * Simulates data for Alt demo
 */
app.get('/api/altdatademo/', function(req, res, next) {
  
  if(req.query.testError){
    res.status(500).send({message: 'This is an error message.'})
  }else{
    res.send({"carts": [
                  {
                      "ageDays": 2,
                      "ageHours": 41,
                      "createdDate": "2016-08-10T17:00:55.16",
                      "email": "bob@boberson.com",
                      "emailUses": 2,
                      "firstName": "Bob",
                      "lastName": "Boberson",
                      "orderCount": 0,
                      "userID": 1234
                  },
                  {
                      "ageDays": 2,
                      "ageHours": 41,
                      "createdDate": "2016-08-10T17:00:55.16",
                      "email": "larry@McHenry.com",
                      "emailUses": 1,
                      "firstName": "Larry",
                      "lastName": "McHenry",
                      "orderCount": 0,
                      "userID": 3334
                  }
              ],
              "ok": true
          })
  }
});





//React routes middleware
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('OH HAI. No page for that.')
    }
  });
});


//server.listen(app.get('port'), function() {
app.listen(app.get('port'), function() {
  console.log('Express server listening at ' + app.get('ip') + ':' + app.get('port'));
});
