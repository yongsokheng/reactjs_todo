import React, { Component } from 'react'
import CreateForm from './CreateForm';
import ToDoItem from './ToDoItem';
import './ToDoList.css';
import { Table, Container, Row} from 'reactstrap';

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      items: [
        {id: 1, name: 'task1'},
        {id: 2, name: 'task2'},
        {id: 3, name: 'task3'},
        {id: 4, name: 'task4'},
      ],
      taskName: ''
    }
  }

  onAddItem(e) {
    e.preventDefault();
    let newTask = {id: Date.now(), name: this.state.taskName}
    this.setState({
      items: [...this.state.items, newTask]
    })
  }

  onDelete(id) {
    const filteredItems = this.state.items.filter(item => {
      return item.id !== id
    })
    this.setState({
      items: filteredItems,
    })
  }

  onChange(e) {
    const taskName = e.target.value;
    this.setState({
      taskName: taskName
    })
  }

  renderItem() {
    const items = this.state.items.map((task) =>
      <ToDoItem
        key={task.id}
        name={task.name}
        onDelete={() => this.onDelete(task.id)}
      />
    )
    return items;
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
              </tr>
            </thead>
            <tbody>
              {this.renderItem()}
            </tbody>
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
