import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './style.scss';
import BaseComponent from './base';
import { SearchOrAdd, Folders, Bookmarks } from '../../components';

@DragDropContext(HTML5Backend)
export default class Home extends BaseComponent {

  render() {
    return (
      <div className="home">
        <h1 className="title">TOM</h1>
        <div className="container">
          <div className="row">
            <SearchOrAdd
              onChange={this.search}
              onEnter={this.addItem}
              folders={this.state.folders}
            />
          </div>
          <div className="row">
            <div className="hidden-sm-down col-md-4">
              <Folders
                items={this.state.folders}
                onClick={this.selectFolder}
                activeFolder={this.state.activeFolder}
                onEnter={this.onAddFolder}
                onDelete={this.onDeleteFolder}
              />
            </div>
            <div className="col-sm-12 col-md-8">
              <Bookmarks
                items={this.state.items}
                onMoveItem={this.moveItem}
                onDeleteItem={this.onDeleteItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
