import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ToDoItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
      </tr>
    )
  }
}

export default ToDoItem
