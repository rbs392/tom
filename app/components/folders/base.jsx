import React, { Component } from 'react';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
    }
    this.onAdd = this.onAdd.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onAdd() {
    this.setState({ show: true });
  }

  onCancel(event) {
    event.stopPropagation()
    this.setState({ show: false });
  }

  onChange(event) {
    this.setState({ name: event.target.value });
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      const { name } = this.state;
      this.props.onEnter({ name }, () => {
        this.setState({
          name: '',
          show: false,
        });
      })
    }
  }

  onDelete(id, event) {
    event.stopPropagation();
    this.props.onDelete(id);
  }

}
