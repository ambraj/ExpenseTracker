import React, { Component } from "react";
import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label, Input, Button, Container, Form, FormGroup, Table } from "reactstrap";
import { Link } from "react-router-dom";

class Expenses extends Component {
  emptyItem = {
    id: "103",
    expenseDate: new Date(),
    description: "",
    location: "",
    categories: [1, "Travel"],
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: true,
      categories: [],
      expenses: [],
      item: this.emptyItem,
    };
  }

  state = {
    date: new Date(),
    isLoading: true,
    categories: [],
    expenses: [],
    item: this.emptyItem,
  };

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();

    this.setState({ categories: body, isLoading: false });

    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();

    this.setState({ expenses: bodyExp, isLoading: false });
  }

  async remove(id) {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenses = [...this.state.expenses].filter((i) => i.id !== id);
      this.setState({ expenses: updatedExpenses });
    });
  }

  render() {
    const title = <h3>Add Expense</h3>;
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading .....</div>;
    }

    let categoryOptions = categories.map((category) => <option id={category.id}>{category.name}</option>);

    let expenseRows = expenses.map((expense) => (
      <tr>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>{expense.category.name}</td>
        <td>{expense.expenseDate}</td>
        <td>
          <Button size='sm' color='danger' onClick={() => this.remove(expense.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav></AppNav>

        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input type='text' name='title' id='title' onChange={this.handleChange} autoComplete='name' />
            </FormGroup>

            <FormGroup>
              <Label for='category'>Category</Label>
              <select name='category' id='category'>
                {categoryOptions}
              </select>
            </FormGroup>

            <FormGroup>
              <Label for='expenseDate'>Date</Label>
              <br />
              <DatePicker selected={this.state.date} onChange={this.handleChange} />
            </FormGroup>

            <div className='row'>
              <FormGroup className='col-md-4 mb-3'>
                <Label for='location'>Location</Label>
                <Input type='text' name='location' id='location' onChange={this.handleChange} />
              </FormGroup>
            </div>

            <FormGroup>
              <Button color='primary' type='submit'>
                Save
              </Button>
              <Button color='secondary' tag={Link} to='/'>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>

        <Container>
          <h3>Expense List</h3>
          <Table className='mt-4'>
            <thead>
              <tr>
                <th width='30%'>Description</th>
                <th width='10%'>Location</th>
                <th>Category</th>
                <th>Date</th>
                <th width='10%'>Action</th>
              </tr>
            </thead>
            <tbody>{expenseRows}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Expenses;
