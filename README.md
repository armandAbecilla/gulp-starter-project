# gulp-starter-project
Simple Project Starter Template using Gulp v3.9.0

### How to use:
run `npm install` to install dependencies.

run `gulp watch` to launch and preview your project on the browser.

#### Description:
This starter template automates commonly used tasks using simple `gulp` commands such as compiling SCSS/SASS and transpiling ES6 commands to ES5.

Style task includes compiling SCSS to CSS files, applying necessary vendor prefixes, as well as adding sourcemaps. You can run styles command by running `gulp styles`

Script task includes transpiling ES6 to ES5, adding sourcemaps, minifying all scripts, as well as bundling all `.js` files into one file called `bundle.js`

See file `package.json` for packages used on this gulp task runner.

#### Notes:

This gulp task runner uses SCSS as default for styling. If you prefer to use Normal `.css` files, edit the `gulpfile.js` and uncomment the section that configures the task for automating normal .css files. <b> Make sure to comment out the section for using the SCSS styles. </b>