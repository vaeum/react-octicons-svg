'use strict';

import gulp from 'gulp';
import insert from 'gulp-insert';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import filenames from 'gulp-filenames';
var toPascalCase = require('to-pascal-case');

const $ = gulpLoadPlugins({});

let fileList = [];

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

gulp.task('svg', () =>
  gulp.src('./node_modules/octicons/build/svg/**/*.svg')
    .pipe(filenames("svg"))
    .pipe($.svgmin((file)=>{
      var name = path.basename(file.relative, path.extname(file.relative));

      return {
        plugins:[
          {removeDoctype: true},
          // {addClassesToSVGElement: {className: `ico-${name}`}},
          {addAttributesToSVGElement: {attribute: "className", value: `octicons octicons-${name}`}},
          {removeTitle: true},
          {removeStyleElement: true},
          {removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] }},
          {removeEmptyContainers: true},
          {sortAttrs: true},
          {removeUselessDefs: true},
          {removeEmptyText: true},
          {removeEditorsNSData: true},
          {removeEmptyAttrs: true},
          {removeHiddenElems: true}
        ]
      }
    }))

    .pipe(insert.transform(function(contents, file) {
      var name = toPascalCase(cap(path.basename(file.relative, path.extname(file.relative))));

      fileList = filenames.get("svg");

      var react = "import React from 'react';\n\n";
      var prepend = 'const '+ name +' = ((props) =>\n';
      var append = '\n)\n\nexport default '+name+';';

      return react + prepend + "    " + contents + append;
    }))
    .pipe($.extReplace('.jsx'))
    .pipe($.rename(function (path) {
      path.basename = toPascalCase(cap(path.basename))
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('file', () =>
  gulp.src('./index.js')
    .pipe(insert.transform(function(contents, file) {
      let text = "";

      fileList.map((e) => {
          text += `import ${toPascalCase(cap(e.replace(/\.svg$/gm, '')))} from './dist/${toPascalCase(cap(e.replace(/\.svg$/gm, '')))}';\n`;
      })

      var footer = 'export {\n';

      fileList.map((e) => {
          footer += `    ${toPascalCase(cap(e.replace(/\.svg$/gm, '')))},\n`;
      })

      return text + '\n' +footer + '};';
    }))
    .pipe(gulp.dest('./'))
)

gulp.task('default', gulp.series(
  'svg', 'file'
))
