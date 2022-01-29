import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import AddContacts from './components/AddContacts';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  const addContact = contact => {
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
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  useEffect(() => {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLS) {
      setContacts(contactsLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="app-content">
      <h1>Phonebook</h1>
      <AddContacts onSubmit={addContact} />

      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={filterChange} />
          <ContactList
            contacts={getFilteredContacts()}
            onDeleteContact={deleteContact}
          />
        </>
      )}
    </div>
  );
};

export default App;
