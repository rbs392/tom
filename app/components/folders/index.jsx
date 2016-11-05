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
                <Folder key={id}>
                  <i className="fa fa-folder-o" />
                  <label>folder</label>
                </Folder>
              )
            }
            <Folder key="trash">
              <i className="fa fa-trash-o" />
              <label>Trash</label>
            </Folder>
          </ul>
        </div>
      </div>
    );
  }
}
