import React, { Component } from 'react';
import Service from '../../service';

export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      folders: [],
      activeFolder: 'All',
    }
    this.items          = [];
    this.search         = this.search.bind(this);
    this.addItem        = this.addItem.bind(this);
    this.moveItem       = this.moveItem.bind(this);
    this.initItems      = this.initItems.bind(this);
    this.onAddFolder    = this.onAddFolder.bind(this);
    this.initFolders    = this.initFolders.bind(this);
    this.selectFolder   = this.selectFolder.bind(this);
    this.onDeleteItem   = this.onDeleteItem.bind(this);
    this.onDeleteFolder = this.onDeleteFolder.bind(this);
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

  onAddFolder(folder, callback) {
    Service.addFolder(folder)
    .then((data) => {
      Service.getFolders().then(this.initFolders);
      callback();
    });
  }

  onDeleteFolder(id) {
    Service.deleteFolder(id)
    .then((data) => {
      Service.getFolders().then(this.initFolders);
    });
  }

  onDeleteItem(id) {
    Service.deleteItem(id)
    .then((data) => {
      Service.getItems().then(this.initItems);
    });
  }

  moveItem(id, item, callback) {
    Service.update(id, item)
    .then((data) => {
      Service.getItems().then((data) =>
        this.initItems(data, item.folder));
    });

  }
}
