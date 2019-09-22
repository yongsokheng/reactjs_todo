import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ToDoItem extends Component {
  renderData() {
    let task = this.props.task;
    if (task.completed) {
      return(
        <tr>
          <td style={{textDecoration: "line-through"}}>
            {task.title}
          </td>
          <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
          <td>Completed</td>
        </tr>
      )
    } else {
      return(
        <tr>
          <td>{task.title}</td>
          <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
          <td><Button color="success" onClick={this.props.onDone}>Done</Button></td>
        </tr>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderData()}
      </React.Fragment>
    )
  }
}

export default ToDoItem
