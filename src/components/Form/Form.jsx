import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './form.module.css';

class Form extends Component {
  state = {
    number: '',
    name: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  handleNameChange = e => {
    console.log(e);
    this.setState({ name: e.currentTarget.value });
  };
  handleNumberChange = e => {
    console.log(e);
    this.setState({ number: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit({ name: this.state.name, number: this.state.number });
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor={this.nameId}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label htmlFor={this.numberId}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleNumberChange}
          />
        </label>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;