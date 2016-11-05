import React, { Component } from 'react';
import './style.scss';

export default class SearchOrAdd extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = { text: '', showAddControl: false };
  }
  onKeyDown(event) {
    if(event.keyCode === 13){
      this.setState({ showAddControl: true });
    }
  }

  onSave() {
    this.setState({ saving: true }, () => {
      this.props.onEnter(this.state.text, ()=>{
        this.setState({ showAddControl: false, saving: false });
      });
    });
  }

  onCancel() {
    this.setState({ showAddControl: false });
  }

  onChange(event) {
    const text = event.target.value;
    this.setState({ text });
    this.props.onChange(text);
  }

  render() {
    return (
      <div className="component-searchoradd clearfix">
        <div className="col-sm-12 form-group">
          <input
            type="text"
            value={this.state.text}
            className="form-control"
            placeholder="Search you bookmarks if not add them"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </div>
        {
          this.state.showAddControl ? (
            <div className="col-sm-12">
              <div className="form-group input-group">
                <input
                  type="text"
                  value={this.state.title}
                  className="form-control"
                  placeholder="Title"
                />
                <span className="input-group-btn dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Public
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </span>
              </div>
              <div className="form-group text-sm-right">
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                </div>
              </div>
            </div>
          ) : null

        }
      </div>

    );
  }
}
