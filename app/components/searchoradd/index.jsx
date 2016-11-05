import React, { Component } from 'react';
import './style.scss';

export default class SearchOrAdd extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setFolder = this.setFolder.bind(this);
    this.state = {
      title: '',
      url: '',
      folder: '',
      showAddControl: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.folders[0]) {
      this.setState({ folder: nextProps.folders[0].name });
    }
  }

  onKeyDown(event) {
    if(event.keyCode === 13){
      this.setState({ showAddControl: true });
    }
  }

  onSave() {
    this.setState({ saving: true }, () => {
      const { title, url, folder } = this.state;
      this.props.onEnter({ title, url, folder }, ()=>{
        this.setState({
          title: '',
          url: '',
          folder: this.props.folders[0].name,
          showAddControl: false,
        });
      });
    });
  }

  onCancel() {
    this.setState({ showAddControl: false });
  }

  onChange(event) {
    const title = event.target.value;
    this.setState({ title });
    this.props.onChange(title);
  }

  setFolder(folder) {
    this.setState({ folder });
  }

  setUrl(event) {
    const url = event.target.value;
    this.setState({ url });
  }

  render() {
    const folders = this.props.folders.slice();
    return (
      <div className="component-searchoradd clearfix">
        <div className="col-sm-12 form-group">
          <input
            type="text"
            value={this.state.title}
            className="form-control"
            placeholder="Search you bookmarks if not press enter to add."
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
                  value={this.state.url}
                  placeholder="Enter a url."
                  className="form-control"
                  onChange={this.setUrl}
                />
                <span className="input-group-btn dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.folder}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                      folders.map((folder, i) =>
                        <a key={i} className="dropdown-item" onClick={this.setFolder.bind(null, folder.name)}>{folder.name}</a>
                      )
                    }
                  </div>
                </span>
              </div>
              <div className="form-group text-sm-right">
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary" onClick={this.onSave}>Save</button>
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
