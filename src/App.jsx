import React, { Component } from 'react';
import * as icon from 'react-octicons-svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import Fuse from 'fuse.js';
import Footer from './Footer';

import pj from 'react-octicons-svg/package.json';
import readme from 'react-octicons-svg/README.md';
import './style.less';

const cn = require('bem-cn')('icons');
const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copiedId: null,
      showNote: false,
      iconArr: [],
      searchArr: [],
      searchText: '',
    }
  }

  componentDidMount() {
    var arr = [];

    for (var key in icon) {
      arr.push(icon[key])
    }

    this.setState({
      iconArr: arr,
      searchArr: arr,
    });
  }

  render() {
    let { iconArr, searchText, searchArr } = this.state;

    return (
      <div className="container">
        <div className="github-badge">
          <a href={`${pj.homepage.replace('#readme', '')}`} target="_blank">
            Fork me on Github!
          </a>
        </div>

        <div className="row">
          <div className="col-xs-8">
            <h1 className={cn('page-title')}>
              {`${cap(pj.name)}`} {`v${pj.version}`} <br/>
              <small>{pj.description}</small>
            </h1>
          </div>
          <div className="col-xs-4">
            <input
              type="text"
              placeholder="search icon ..."
              className={cn('filter-input')}
              value={searchText}
              onChange={(e) => {
                this.setState({searchText: e.target.value});

                if(e.target.value == ""){
                  this.setState({searchArr: iconArr});
                } else {
                  const fuse = new Fuse(iconArr, {
                    keys: ['name'],
                  });

                  this.setState({searchArr: fuse.search(e.target.value)});
                }
              }}
            />
          </div>
        </div>

        <div className={cn('note').state({show: this.state.showNote})}>
          <span>Copied</span>
        </div>

        <ul className={cn('list').mix('clearfix')}>
          {searchArr.map((e, i) =>
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

          {searchArr.length == 0 ? <div className={cn('not-found') }>
            <h3>Result not found</h3>
          </div> : null}
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
