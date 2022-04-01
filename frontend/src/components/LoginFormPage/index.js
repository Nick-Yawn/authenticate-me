import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionUser } from '../../store/session.js' 
import { Redirect } from 'react-router-dom';

require('./index.css');

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session?.user);
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);

  if( sessionUser ){
    console.log('Went to render login form, but already logged in')
     return (<Redirect to='/' />)
  }

  const updateCredential = e => {
    setCredential(e.target.value);
  }

  const updatePassword = e => {
    setPassword(e.target.value);
  }

  const handleLogin = async e => {
    e.preventDefault();
    const loginErrors = await dispatch(setSessionUser({credential, password}));
    if( loginErrors ) setErrors(loginErrors);
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <ul>
        {errors.map( (e,i) => <li key={i}>{e}</li> )}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          required
          value={credential}
          onChange={updateCredential}
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
      <button type="submit">Login</button>
    </form>      
  );
};

