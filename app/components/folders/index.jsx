import React, { Component } from 'react';

import './style.scss';
import Folder from './folder';

export default class Folders extends Component {
  render() {
    return (
      <div className="component-folders row">
        <div className="col-sm">
          <h6> Folders </h6>
          <hr />
          <ul className="list-group">
            {
              this.props.items.map((folder, id) =>
                <Folder
                  key={id}
                  name={folder}
                  onClick={this.props.onClick.bind(null, folder)}
                  className={`${(this.props.activeFolder === folder) ? 'active-folder' : ''}`}
                >
                  <i className="fa fa-folder-o" />
                  <label>{folder}</label>
                </Folder>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}
