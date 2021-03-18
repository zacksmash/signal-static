const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Set project paths
const localDomain = 'http://CHANGE_ME.test';

mix
  // Utilities
  .setPublicPath('dist')
  .sourceMaps()
  .options({
    processCssUrls: false
  })

  // Add global libraries
  .autoload({
    jquery: ['$', 'jQuery'],
    uikit: 'UIkit'
  })

  // Suppress success messages
  .disableSuccessNotifications()

  // Compile Javascript (ES6)
  .js('src/js/app.js', 'dist/js').extract()

  // Compile Sass
  .sass('src/scss/app.scss', 'dist/css')

  // .copy('resources/img', 'public/img')
  // .copy('resources/fonts', 'public/fonts')

  // Setup BrowserSync
  .browserSync({
    proxy: localDomain,
    host: localDomain.replace(/^https?:\/\//, ''),
    notify: false,
    open: false,
    files: [
      './**/*.html',
      './**/*.css',
      './**/*.js'
    ]
  })

// Setup versioning (cache-busting)
if (mix.inProduction()) {
  mix.version()
}
