import { DropTarget } from 'react-dnd';
import React, { Component } from 'react';

const spec = {
  drop(props, monitor) {
    return {folder: props.name}
  },
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.folder !== props.name;
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

@DropTarget('Items', spec, collect)
export default class Folder extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    const isOverBg =   (isOver) ? 'rgba(0,255,0, 0.2)': 'white';
    const background = (isOver && !canDrop) ? 'rgba(0,0,0, 0.2)' : isOverBg;
    return connectDropTarget(
      <li key={this.props.key} className="list-group-item" style={{ background }} >
        {this.props.children}
      </li>
    );
  }
}
