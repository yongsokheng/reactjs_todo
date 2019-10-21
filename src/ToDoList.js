import React, { Component } from 'react'
import CreateForm from './CreateForm';
import ToDoItem from './ToDoItem';
import './ToDoList.css';
import { Table, Container, Row} from 'reactstrap';

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      taskName: ''
    }
  }

  componentDidMount() {
    fetch('http://192.168.2.105:2000/api/v1/tasks')
    .then(res => res.json())
    .then((response) => {
      this.setState({items: response.data})
    })
    .catch(error => {
      console.log(error);
    })
  }

  onAddItem(e) {
    e.preventDefault();
    fetch('http://192.168.2.105:2000/api/v1/tasks', {
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
        this.setState({items: [...this.state.items, response.data]});
      } else {
        alert(response.errors.map(data => data.message).join('\n'));
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  onDelete(id) {
    fetch(`http://192.168.2.105:2000/api/v1/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
        const filteredItems = this.state.items.filter(item => {
          return item.id !== id
        })
        this.setState({
          items: filteredItems,
        })
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
    fetch(`http://192.168.2.105:2000/api/v1/tasks/${id}`, {
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
        let updatedData = this.state.items.map(item => {
          if(item.id === id) {
            return {...response.data}
          }
          return item;
        });
        this.setState({
          items: updatedData,
        })
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
    const items = this.state.items.map((task) =>
      <ToDoItem
        key={task.id}
        task={task}
        onDelete={() => this.onDelete(task.id)}
        onDone={() => this.onUpdate({id: task.id, completed: true})}
        onFocusOut={(title) => this.onUpdate({id: task.id, title: title})}
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
                <th></th>
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
