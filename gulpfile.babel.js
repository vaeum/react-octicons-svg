'use strict';

import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import filenames from 'gulp-filenames';
import toPascalCase from 'to-pascal-case';
import changeCase from 'change-case';

const $ = gulpLoadPlugins({});
const PREFIX = 'Icon';
const CLASSNAME = 'octicons';

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
      let name = toPascalCase(cap(path.basename(file.relative, path.extname(file.relative))));

      fileList = filenames.get("svg");

      let component = `
      import React, {Component, PropTypes} from 'react';

      export default class ${name}${PREFIX} extends Component {
        static propTypes = {
          className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
          ]),
          onClick: PropTypes.func,
        };

        constructor(props) {
          super(props);
        }

        render() {
          return (
            ${contents}
          )
        }
      };`;

      return component;
    }))
    .pipe($.extReplace('.jsx'))
    .pipe($.rename(function (path) {
      path.basename = `${toPascalCase(cap(path.basename))}${PREFIX}`
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('replace', function() {
  return gulp.src('dist/*.jsx')
    .pipe($.tap(function(file) {
      var fileName = path.basename(file.path);
      var className = changeCase.lowerCase(changeCase.headerCase(fileName.replace('.jsx', '')));

      return gulp.src('dist/' + fileName)
        .pipe($.replace("classNameString", `className="${CLASSNAME} ${CLASSNAME}-${className}" {...this.props}`))
        .pipe(gulp.dest('./dist'));
    }));
});

gulp.task('file', () =>
  gulp.src('./index.js')
    .pipe($.insert.transform(function(contents, file) {
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

gulp.task('default', gulp.series(
  'svg', 'replace', 'file'
))

