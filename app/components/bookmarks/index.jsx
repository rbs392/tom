import React, { Component } from 'react';
import Item from '../item';

export default class Bookmarks extends Component {
  render() {
    return (
      <div className="component-bookmarks row">
        <div className="col-sm">
          <h6>Bookmarks</h6>
          <hr/>
          {
            this.props.items.map((item, id) =>
              <Item key={id} {...item} onMoveItem={this.props.onMoveItem}/>
            )
          }
        </div>
      </div>
    );
  }
}
