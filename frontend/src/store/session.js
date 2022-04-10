import { csrfFetch } from './csrf.js';

const SET_USER = 'user/SET'
const UNSET_USER = 'user/UNSET'
const GET = 'user/GET'

const set = user => ({
  type: SET_USER,
  user
})

const unset = () => ({
  type: UNSET_USER,
  user: null
})

const get = user => ({
  type: GET,
  user
}) 

export const loginDemoUser = () => async dispatch => {
  const response = await csrfFetch('/api/session/demo-user')
  const data = await response.json();
  
  if( response.ok ){ 
    dispatch(set(data.user));
  }
}

export const setSessionUser = credentials => async dispatch => {
   
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials) // { credential, password }
  });
  const data = await response.json();

  if( response.ok ){
    dispatch(set(data.user))
    return null;
  } else {
    return data?.errors;
  }

};

export const getSessionUser = () => async dispatch => {
  const response = await csrfFetch('/api/session')
  
  if( response.ok ){
    const data = await response.json();
    dispatch(get(data?.user || null));
  }
}

export const signup = credentials => async dispatch => {
  
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials) // {username, email, password}
  });

  if( response.ok ){
    const data = await response.json();
    dispatch(set(data.user))
    return null;
  } else {
    const data = await response.json();
    return data?.errors;
  }
 
}

export const logout = () => async dispatch => {
  
  const response = await csrfFetch('/api/session', { method: 'DELETE' });
  
  if( response.ok ){
    dispatch(unset());
  }
 
};

export default function sessionUserReducer(state = null, action) {
  switch(action.type){
    case SET_USER:
      return {...state, user: action.user}
    case UNSET_USER:
      return {...state, user: action.user}
    case GET:
      return {...state, user: action.user}
    default:
      return state
  }
}
