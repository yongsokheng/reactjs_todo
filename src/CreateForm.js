import React, { Component } from 'react';
import { Button, InputGroup, Input } from 'reactstrap';

class CreateForm extends Component {
  render() {
    return (
      <div className="formCreate">
        <form onSubmit={this.props.onAddItem}>
        <InputGroup>
          <Input
            placeholder="task name"
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <Button color="primary">Add</Button>
        </InputGroup>
        </form>
      </div>
    )
  }
}

export default CreateForm
