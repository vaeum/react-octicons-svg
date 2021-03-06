'use strict';

import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import filenames from 'gulp-filenames';
import toPascalCase from 'to-pascal-case';
import changeCase from 'change-case';

const $ = gulpLoadPlugins({});
const PREFIX = '';
const CLASSNAME = 'octicons';

let spawn = require('child_process').spawn;
let fileList = [];

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

gulp.task('svg', () =>
  gulp.src('./node_modules/octicons/build/svg/**/*.svg')
    .pipe(filenames("svg"))
    .pipe($.svgmin((file) => {
      let name = path.basename(file.relative, path.extname(file.relative));

      return {
        plugins:[
          {removeDoctype: true},
          {addAttributesToSVGElement: {attribute: "classNameString"} },
          {removeTitle: true},
          {removeStyleElement: true},
          {removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill'] }},
          {removeEmptyContainers: true},
          {sortAttrs: true},
          {removeUselessDefs: true},
          {removeEmptyText: true},
          {removeEditorsNSData: true},
          {removeEmptyAttrs: true},
          {removeHiddenElems: true},
          {collapseGroups: false},
        ]
      }
    }))

    .pipe($.insert.transform((content, file) => {
      let name = toPascalCase(cap(path.basename(file.relative, path.extname(file.relative))));

      fileList = filenames.get("svg");

      let component = `
      import React from 'react';
      const ${name}${PREFIX} = (props) => ${content}
      export default ${name}${PREFIX}`;
      return component;
    }))
    .pipe($.extReplace('.js'))
    .pipe($.rename((path) => {
      path.basename = `${toPascalCase(cap(path.basename))}${PREFIX}`
    }))
    .pipe(gulp.dest('./dist'))
)

gulp.task('replace', () => {
  return gulp.src('./dist/*.jsx')
    .pipe($.tap((file) => {
      let fileName = path.basename(file.path);
      let className = changeCase.lowerCase(changeCase.headerCase(fileName.replace('.js', '')));

      return gulp.src('./dist/' + fileName)
        .pipe($.replace(
          "classNameString",
          `{...props} className={\`${CLASSNAME} ${CLASSNAME}-${className} \${props.className\}\`}`
        ))
        .pipe($.replace(/xmlns:xlink=".+?"/g, ``))
        .pipe($.replace(/xlink:href=".+?"/g, ``))
        .pipe($.replace("fill-rule=", "fillRule="))
        .pipe(gulp.dest('./dist'));
    }));
});

gulp.task('file', () =>
  gulp.src('./index.js')
    .pipe($.insert.transform((contents, file) => {
      let text = "";

      fileList.map((e) => {
        let fileName = toPascalCase(cap(e.replace(/\.svg$/gm, '')));
        text += `import ${fileName}${PREFIX} from './dist/${fileName}${PREFIX}';\n`;
      })

      let footer = 'export {\n';

      fileList.map((e) => {
        let fileName = toPascalCase(cap(e.replace(/\.svg$/gm, '')));
        footer += `    ${fileName}${PREFIX},\n`;
      })

      return text + '\n' +footer + '};';
    }))
    .pipe(gulp.dest('./'))
)

gulp.task('gulp-reload', () => {
  spawn('./node_modules/.bin/gulp', ['default'], {stdio: 'inherit'});
  process.exit();
});

gulp.task('watch', () => {
  gulp.watch('gulpfile.babel.js', gulp.series('gulp-reload'));
});

gulp.task('build', gulp.series(
  'svg', 'replace', 'file'
))

gulp.task('default', gulp.series(
  'svg', 'replace', 'file', 'watch'
))
