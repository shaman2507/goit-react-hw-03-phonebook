import React, { Component } from 'react';
import ContactsList from './contacts/ContactsList';
import Form from './Form/Form';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const LocalData = localStorage.getItem('contacts');
    if (LocalData) this.setState({ contacts: JSON.parse(LocalData) });
  }

  componentDidUpdate(prevProps, PrevState) {
    if (PrevState.contacts !== this.state.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = contact => {
    const prevContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    const prevContactsNumber = this.state.contacts.some(
      ({ number }) => number === contact.number
    );

    if (prevContacts) {
      alert(`${contact.name} is already exists`);
      return;
    }

    if (prevContactsNumber) {
      alert(`${contact.number} is already exists`);
      return;
    }

    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const Contacts = this.getContacts();
    const { filter } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {this.state.contacts.length === 0 ? (
          <div>Your phonebook is empty. Add first contact!</div>
        ) : (
          <>
            <Filter value={filter} onChangeFilter={this.changeFilter} />
            <ContactsList
              contacts={Contacts}
              onRemoveContact={this.removeContact}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;