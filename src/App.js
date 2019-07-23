import React, { Component } from 'react';
import './App.css';
import TodoList from './ToDoList';
import NavHeader from './component/NavHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavHeader />
        <TodoList />
      </div>
    );
  }
}

export default App;
