import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './AddContacts.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
    )
    .required(),
  number: Yup.string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    )
    .required(),
});

const AddContacts = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <div className={s.formWrap}>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name">
            {msg => <div style={{ color: 'red', fontSize: '13px' }}>{msg}</div>}
          </ErrorMessage>
          <label htmlFor="name">Number</label>
          <Field type="tel" name="number" />
          <ErrorMessage name="number">
            {msg => <div style={{ color: 'red', fontSize: '13px' }}>{msg}</div>}
          </ErrorMessage>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
};

AddContacts.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddContacts;
