import React, { Component } from 'react'
import CreateForm from './CreateForm';
import ToDoItem from './ToDoItem';
import './ToDoList.css';
import { Table, Container, Row} from 'reactstrap';
import ActionCable from 'actioncable'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      taskName: ''
    }

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items: items
    })

    this.onUpdate({id: result.draggableId, row_order_position: result.destination.index});
  }


  componentDidMount() {
    fetch('http://192.168.2.102:2000/api/v1/tasks')
    .then(res => res.json())
    .then((response) => {
      this.setState({items: response.data})
    })
    .catch(error => {
      console.log(error);
    })

    const cable = ActionCable.createConsumer('ws://192.168.2.102:2000/cable')
    this.subscriptions = cable.subscriptions.create('TasksChannel', {
      received: (data) => {
        if(data.type === 'add') {
          this.setState({items: [...this.state.items, data.task]});
        } else if(data.type === 'update') {
          let updatedData = this.state.items.map(item => {
            if(item.id === data.task.id) {
              return {...data.task}
            }
            return item;
          });
          this.setState({
            items: updatedData
          })
        } else if(data.type === 'delete') {
          const filteredItems = this.state.items.filter(item => {
            return item.id !== data.task.id
          })
          this.setState({
            items: filteredItems,
          })
        }
      }
     })
  }

  onAddItem(e) {
    e.preventDefault();
    fetch('http://192.168.2.102:2000/api/v1/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.taskName,
      })
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
        // this.setState({items: [...this.state.items, response.data]});
      } else {
        alert(response.errors.map(data => data.message).join('\n'));
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  onDelete(id) {
    fetch(`http://192.168.2.102:2000/api/v1/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
        // const filteredItems = this.state.items.filter(item => {
        //   return item.id !== id
        // })
        // this.setState({
        //   items: filteredItems,
        // })
      } else {
        alert("Cannot delete");
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  onUpdate(params) {
    let id = params.id;
    fetch(`http://192.168.2.102:2000/api/v1/tasks/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
        // let updatedData = this.state.items.map(item => {
        //   if(item.id === id) {
        //     return {...response.data}
        //   }
        //   return item;
        // });
        // this.setState({
        //   items: updatedData,
        // })
      } else {
        alert("Cannot delete");
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  onChange(e) {
    const taskName = e.target.value;
    this.setState({
      taskName: taskName
    })
  }

  renderItem() {
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <tbody ref={provided.innerRef}>
              {
                this.state.items.map((item, index) => (
                    <ToDoItem
                      index={index}
                      key={item.id}
                      task={item}
                      onDelete={() => this.onDelete(item.id)}
                      onDone={() => this.onUpdate({id: item.id, completed: true})}
                      onFocusOut={(title) => this.onUpdate({id: item.id, title: title})}
                    />
                  )
                )
              }
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  render() {
    return (
      <Container>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            {this.renderItem()}
          </Table>
          <CreateForm
            onAddItem={(e) => this.onAddItem(e)}
            value={this.state.taskName}
            onChange={(e) => this.onChange(e)}
          />
        </Row>
      </Container>
    )
  }
}

export default TodoList
