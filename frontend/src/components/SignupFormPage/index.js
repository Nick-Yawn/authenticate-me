import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session.js' 
import { Redirect } from 'react-router-dom';


export default function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session?.user);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);
 
  if( sessionUser ){
    console.log('Went to render signup form, but already logged in')
     return (<Redirect to='/' />)
  }

  // TODO: check for username and email uniqueness onChange
  // will need state variables for each to change styling appropriately
  // will also need a route, and if it needs a route it probably needs a thunk.
  // can reuse validators that already exist

  const updateUsername = e => setUsername(e.target.value);
  const updateEmail    = e => setEmail(   e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  const handleSignup = async e => {
    e.preventDefault();
    const signupErrors = await dispatch(signup({username, email, password}));
    if( signupErrors ) setErrors(signupErrors);
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <ul>
        {errors.map( (e,i) => <li key={i}>{e}</li> )}
      </ul>
      <label>
        Username
        <input
          type="text"
          required
          value={username}
          onChange={updateUsername}
        />
      </label>
      <label>
        Email
        <input
          type="text"
          required
          value={email}
          onChange={updateEmail}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          required
          value={password}
          onChange={updatePassword}
        />
      </label>
      <button type="submit">Signup</button>
    </form>      
  );
}
