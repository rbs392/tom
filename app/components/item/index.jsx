import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import './style.scss';

const spec = {
  beginDrag() {
    return {}
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

@DragSource('Items', spec, collect)
export default class Item extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="component-item" style={{ background: isDragging ? 'yellow': 'white'}}>
        <a href={this.props.url}>{this.props.title}</a>
      </div>
    );
  }
}
