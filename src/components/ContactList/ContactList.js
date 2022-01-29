import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};

export default ContactList;
