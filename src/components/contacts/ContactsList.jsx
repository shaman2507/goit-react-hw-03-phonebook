import React from 'react';
import PropTypes from 'prop-types';
import css from './contactsList.module.css';

const ContactsList = ({ contacts, onRemoveContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          {name}: {number}
          <button
            className={css.btn}
            type="button"
            name="delete"
            onClick={() => onRemoveContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactsList;