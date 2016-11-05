import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import './style.scss';
import Service from '../../service';

const spec = {
  beginDrag(props) {
    const { title, url, folder } = props;
    return { title, url, folder };
  },

  endDrag(props, monitor) {
    const newFolder = monitor.getDropResult();
    if(newFolder){
      const { title, url, folder } = Object.assign({}, props, newFolder);
      Service.update(props._id, { title, url, folder });
    }
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
      <div className="component-item" style={{ background: isDragging ? 'rgba(85, 179, 62, 0.35)': 'white'}}>
        <a target="__blank" href={this.props.url}>{this.props.title}</a>
      </div>
    );
  }
}
