import { DropTarget } from 'react-dnd';
import React, { Component } from 'react';

const spec = {
  drop: (props, monitor, component) => {},
  canDrop: (props, monitor) => true,
  hover: (props, monitor, component) => {},
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
})

@DropTarget('Items', spec, collect)
export default class Folder extends Component {
  render() {
    const { connectDropTarget } = this.props;
    console.log(this.props);
    return connectDropTarget(
      <li key={this.props.key} className="list-group-item">
        {this.props.children}
      </li>
    );
  }
}
