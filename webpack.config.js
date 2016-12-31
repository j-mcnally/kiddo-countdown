module.exports = (function(env) {

  process.env.BABEL_ENV = env;

  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ["react"]
          }
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    },
    entry: './static/src/js/app.js',
    output: {
      filename: './static/dist/bundle.js'
    }
  }
})();
