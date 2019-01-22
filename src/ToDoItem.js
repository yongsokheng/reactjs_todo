import React, { Component } from 'react'
class ToDoItem extends Component {
  render() {
    return (
      <li className="todo-item">
        {this.props.name}
        <button onClick={this.props.onDelete}>Delete</button>
      </li>
    )
  }
}

export default ToDoItem
