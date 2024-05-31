import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [validated] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    console.log(formState)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState)

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data)
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setFormState({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <input
          placeholder="Username"
          name="username"
          type="text"
          id="username"
          value={formState.username}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div>Signup failed</div>}
    </div>
  );
};

export default Signup;
