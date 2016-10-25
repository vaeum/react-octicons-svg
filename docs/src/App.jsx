import React, { Component } from 'react';
import * as icon from 'react-octicons-svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import Footer from './Footer';

import pj from '../../package.json';
import readme from '../../README.md';
import './style.scss';

const cn = require('bem-cn')('icons');
const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copiedId: null,
      showNote: false
    }
  }

  renderIcon() {
    var arr = [];

    for (var key in icon) {
      arr.push(icon[key])
    }

    return arr;
  }

  render() {
    return (
      <div className="container">
        <div className="github-badge">
          <a href={`${pj.homepage.replace('#readme', '')}`} target="_blank">
            Fork me on Github!
          </a>
        </div>

        <h1 className="page-title">
          {`${cap(pj.name)}`} {`v${pj.version}`} <br/>
          <small>{pj.description}</small>
        </h1>

        <div className={cn('note').state({show: this.state.showNote})}>
          <span>Copied</span>
        </div>

        <ul className={cn('list').mix('clearfix')}>
          {this.renderIcon().map((e, i) =>
             <li className={cn('list-item')} key={i}>
                <CopyToClipboard text={`<${e.name} />`}
                  onCopy={() => this.setState({copied: true})}>

                  <div
                    className={cn('link').state({copied: this.state.copiedId == i})}
                    onClick={() => this.handerClick(i)} >

                    <span className={cn('icon')}>{React.createElement(e)}</span>
                    <span className={cn('icon-description')}>{e.name}</span>
                  </div>
                </CopyToClipboard>
             </li>
           )}
        </ul>

        <div dangerouslySetInnerHTML={{__html: readme}} />

        <Footer />
      </div>
    );
  }

  handerClick(id){
    this.setState({
      copiedId: id,
      showNote: true
    });

    let hideNote = () => {
      this.setState({showNote: false})
    };

    setTimeout(hideNote, 2000)
  }
}
