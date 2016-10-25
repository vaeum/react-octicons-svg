import React, { Component } from 'react';
const cn = require('bem-cn')('footer');

export default class Footer extends Component {
  render() {
    return (
      <footer className={cn}>
        <div className="row">
          <div className="col-xs-6">

          </div>

          <div className="col-xs-6 text-right">
            {`${new Date().getFullYear()}`}
          </div>
        </div>
      </footer>
    );
  }
}
