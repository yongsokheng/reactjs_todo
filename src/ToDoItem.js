import React, { Component } from 'react';
import { Button } from 'reactstrap';
import EditableLabel from 'react-inline-editing';
import {Draggable} from 'react-beautiful-dnd';

class ToDoItem extends Component {
  renderData(task, provided) {
    if (task.completed) {
      return(
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td style={{textDecoration: "line-through"}}>
            {task.title}
          </td>
          <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
          <td>Completed</td>
        </tr>
      )
    } else {
      return(
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td>
            <EditableLabel
              text={task.title}
              onFocusOut={this.props.onFocusOut}
            />
          </td>
          <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
          <td><Button color="success" onClick={this.props.onDone}>Done</Button></td>
        </tr>
      )
    }
  }

  render() {
    let task = this.props.task;
    let index = this.props.index;

    return (
      <React.Fragment>
        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
            {(provided, snapshot) => (
                this.renderData(task, provided)
              )
            }
        </Draggable>
      </React.Fragment>
    )
  }
}

export default ToDoItem
