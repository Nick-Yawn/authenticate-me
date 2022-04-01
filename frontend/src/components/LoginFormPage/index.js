import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionUser } from '../../store/session.js' 
import { Redirect } from 'react-router-dom';

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
    const response = await dispatch(setSessionUser({credential, password}));
    if( !response.ok ){ // if response is ok, we will already have parsed the data stream to set session
      const data = await response.json();

      if( data?.errors ) setErrors(data.errors);
    }
  }

  return (
    <form onSubmit={handleLogin}>
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

