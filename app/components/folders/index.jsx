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
            <Folder
              key="All"
              name="All"
              onClick={this.props.onClick.bind(null, "All")}
              className={`${(this.props.activeFolder === "All") ? 'active-folder' : ''}`}
            >
              <i className="fa fa-folder-o" />
              <label>All</label>
            </Folder>
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
            <li key="add-new" className="list-group-item">
              <span>
                <i className="fa fa-plus" />
                <label>Add new Folder</label>
              </span>
              <span>
                <input type="text" placeholder="Enter folder name" className="form-control"/>
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
