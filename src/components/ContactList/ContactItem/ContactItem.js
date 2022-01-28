import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';

class ContactItem extends React.Component {
  render() {
    const { id, name, number, onDeleteContact } = this.props;
    return (
      <li className={s.item}>
        <span>
          {name}: {number}
        </span>
        <button className={s.button} onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </li>
    );
  }
}

ContactItem.propTypes = {
  onDeleteContact: PropTypes.func,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactItem;
