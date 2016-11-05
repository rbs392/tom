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
      activeFolder: 'All',
    }
    this.items = [];
    this.search = this.search.bind(this);
    this.addItem = this.addItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.initItems = this.initItems.bind(this);
    this.initFolders = this.initFolders.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
  }

  initItems(items, activeFolder=null) {
    this.items = items;
    this.selectFolder((activeFolder || this.state.activeFolder));
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
    const newItems = this.items.filter(item=>RegExp(text, 'i').test(item.title));
    this.setState({ items: newItems, activeFolder: 'All' })
  }

  selectFolder(activeFolder) {
    this.setState({ activeFolder });
    if(activeFolder == "All"){
      return this.setState({ items: this.items })
    }
    const newItems = this.items.filter(item=>(item.folder===activeFolder));
    this.setState({ items: newItems })
  }

  addItem(item, callback) {
    Service.add(item)
    .then((data) => {
      Service.getItems().then(this.initItems);
      callback();
    });
  }

  moveItem(id, item, callback) {
    Service.update(id, item)
    .then((data) => {
      Service.getItems().then((data) =>
        this.initItems(data, item.folder));
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
              onClick={this.selectFolder}
              activeFolder={this.state.activeFolder}
            />
          </div>
          <div className="col-md-9">
            <Bookmarks items={this.state.items} onMoveItem={this.moveItem}/>
          </div>
        </div>
      </div>
    );
  }
}
