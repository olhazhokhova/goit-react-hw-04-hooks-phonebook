import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import AddContacts from './components/AddContacts';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = contact => {
    const { contacts } = this.state;

    const isContactExist = contacts.find(
      contactItem =>
        contactItem.name.toLowerCase() === contact.name.toLowerCase(),
    );

    if (isContactExist) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLS) {
      this.setState({ contacts: contactsLS });
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const filterContacts = this.getFilteredContacts();

    return (
      <div className="app-content">
        <h1>Phonebook</h1>
        <AddContacts onSubmit={this.addContact} />

        {contacts.length > 0 && (
          <>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={this.filterChange} />
            <ContactList
              contacts={filterContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
