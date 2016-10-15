'use strict';

import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import filenames from 'gulp-filenames';
import toPascalCase from 'to-pascal-case';
import changeCase from 'change-case';

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
          {addAttributesToSVGElement: {attribute: "classNameString"} },
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

    .pipe($.insert.transform(function(contents, file) {
      var name = toPascalCase(cap(path.basename(file.relative, path.extname(file.relative))));

      fileList = filenames.get("svg");

      var react = "import React from 'react';\n\n";
      var prepend = `const ${name} = ((props) =>\n`;

      var propTypes = `\n${name}.propTypes = {
        className: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.func,
        ]),
        onClick: React.PropTypes.func,
      }\n\n`

      var footer = `\n)\n\n${propTypes}export default ${name};`;

      return `${react}${prepend}  ${contents}${footer}`;
    }))
    .pipe($.extReplace('.jsx'))
    .pipe($.rename(function (path) {
      path.basename = toPascalCase(cap(path.basename))
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('replace', function() {
  return gulp.src('dist/*.jsx')
    .pipe($.tap(function(file) {
      var fileName = path.basename(file.path);
      var className = changeCase.lowerCase(changeCase.headerCase(fileName.replace('.jsx', '')));

      return gulp.src('dist/' + fileName)
        .pipe($.replace("classNameString", 'className={`octicons octicons-'+ className +' ${props.className}`} onClick={() => {props.onClick()}}'))
        .pipe(gulp.dest('./dist'));
    }));
});

gulp.task('file', () =>
  gulp.src('./index.js')
    .pipe($.insert.transform(function(contents, file) {
      let text = "";

      fileList.map((e) => {
        let fileName = toPascalCase(cap(e.replace(/\.svg$/gm, '')));
        text += `import ${fileName} from './dist/${fileName}';\n`;
      })

      var footer = 'export {\n';

      fileList.map((e) => {
        let fileName = toPascalCase(cap(e.replace(/\.svg$/gm, '')));
        footer += `    ${fileName},\n`;
      })

      return text + '\n' +footer + '};';
    }))
    .pipe(gulp.dest('./'))
)

gulp.task('default', gulp.series(
  'svg', 'replace', 'file'
))
