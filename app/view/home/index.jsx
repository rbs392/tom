import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Service from '../../service';
import { SearchOrAdd, Folders, Bookmarks } from '../../components';

@DragDropContext(HTML5Backend)
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      folders: [],
    }
    this.items = [];
    this.search = this.search.bind(this);
    this.addItem = this.addItem.bind(this);
    this.initItems = this.initItems.bind(this);
    this.initFolders = this.initFolders.bind(this);
  }

  initItems(items) {
    this.items = items;
    this.setState({ items })
  }

  initFolders(folders) {
    this.folders = folders;
    this.setState({ folders })
  }

  componentDidMount() {
    Service.getItems()
    .then(this.initItems);
    Service.getFolders()
    .then(this.initFolders);
  }

  search(text) {
    const newItems = this.items.filter(item=>RegExp(text).test(item.title));
    this.setState({ items: newItems })
  }

  addItem(item, callback) {
    Service.add(item)
    .then((data) => {
      console.log(data)
      Service.getItems()
      .then(this.initItems);
      callback(data);
    });
  }

  render() {
    return (
      <div className="container">
        <h1>TOM</h1>
        <div className="row">
          <SearchOrAdd
            onChange={this.search}
            onEnter={this.addItem}
            folders={this.state.folders}
          />
        </div>
        <div className="row">
          <div className="col-md-3">
            <Folders
              items={this.state.folders}
            />
          </div>
          <div className="col-md-9">
            <Bookmarks
              items={this.state.items}
              currentFolder={this.state.currentFolder}
            />
          </div>
        </div>
      </div>
    );
  }
}
