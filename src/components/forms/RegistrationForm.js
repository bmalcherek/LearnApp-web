import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { postData } from '../../helpers';

const RegistrationForm = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [passwd1, setPasswd1] = useState('');
  const [passwd2, setPasswd2] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    switch (event.target.name) {
      case 'user':
        setUser(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'passwd1':
        setPasswd1(value);
        break;
      case 'passwd2':
        setPasswd2(value);
        break;
      default:
        console.log('Error');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: user,
      email,
      password1: passwd1,
      password2: passwd2
    };

    console.log(data);

    const response = postData('rest-auth/registration/', data);
    response.then(() => setSubmitted(true)).catch(err => setError(err));
  };

  const redirectToLogin = (
    <Link to="/login">
      <button className="btn" id="redirect-to-login-btn" type="button">
        Login
      </button>
    </Link>
  );

  const registrationForm = (
    <form id="registration-form">
      {error}
      Username:
      <input type="text" name="user" value={user} onChange={handleChange} />
      <br />
      Email:
      <input type="text" name="email" value={email} onChange={handleChange} />
      <br />
      Password:
      <input
        type="password"
        name="passwd1"
        value={passwd1}
        onChange={handleChange}
      />
      <br />
      Repeat password:
      <input
        type="password"
        name="passwd2"
        value={passwd2}
        onChange={handleChange}
      />
      <br />
      <button
        className="btn"
        id="registration-submit-btn"
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div id="registration-form-container">
      {submitted ? redirectToLogin : registrationForm}
    </div>
  );
};

export default RegistrationForm;
