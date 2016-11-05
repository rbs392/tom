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
  }

  updateItems(items, folders) {
    this.items = items;
    this.setState({ items, folders })
  }

  componentDidMount() {
    Service.get()
    .then(data =>
      this.updateItems(data.items, data.folders));
  }

  search(text) {
    const newItems = this.items.filter(item=>RegExp(text).test(item.title));
    this.setState({ items: newItems })
  }

  addItem() {
    console.log("add item");
  }

  render() {
    return (
      <div className="container">
        <h1>TOM</h1>
        <div className="row">
          <SearchOrAdd
            onChange={this.search}
            onEnter={this.addItem}
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
