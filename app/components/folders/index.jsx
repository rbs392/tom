import React, { Component } from 'react';

import './style.scss';
import Folder from './folder';

export default class Folders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
    }
    this.onAdd = this.onAdd.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onAdd() {
    this.setState({ show: true });
  }

  onCancel(event) {
    event.stopPropagation()
    this.setState({ show: false });
  }

  onChange(event) {
    this.setState({ name: event.target.value });
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      const { name } = this.state;
      this.props.onEnter({ name }, () => {
        this.setState({
          name: '',
          show: false,
        });
      })
    }
  }

  onDelete(id, event) {
    event.stopPropagation();
    this.props.onDelete(id);
  }

  render() {
    const folders = this.props.items.slice();
    folders.unshift({ name: 'All' });
    return (
      <div className="component-folders row">
        <div className="col-sm">
          <h6> Folders </h6>
          <hr />
          <ul className="list-group">
            {
              folders.map((folder, id) =>
                <Folder
                  key={id}
                  name={folder.name}
                  onClick={this.props.onClick.bind(null, folder.name)}
                  className={`${(this.props.activeFolder === folder.name) ? 'active-folder' : ''}`}
                >
                  <i className="fa fa-folder-o" />
                  <label>{folder.name}</label>
                  {
                    (folder.name !=='All') ? (
                      <i className="fa fa-trash-o icon-trash" onClick={this.onDelete.bind(null, folder._id)} />
                    ) : null
                  }
                </Folder>
              )
            }
            <li key="add-new" className="list-group-item" onClick={this.onAdd}>
              <span>
                <i className="fa fa-plus" />
                <label>Add new Folder</label>
              </span>
              {
                this.state.show ? (
                  <span className="input-group">
                    <input
                      type="text"
                      placeholder="Enter folder name"
                      className="form-control"
                      onChange={this.onChange}
                      onKeyDown={this.onEnter}
                    />
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-secondary" onClick={this.onCancel}>
                        <i className="fa fa-times" />
                      </button>
                    </span>
                  </span>
                ) : null
              }
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
