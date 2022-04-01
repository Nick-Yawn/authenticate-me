import { csrfFetch } from './csrf.js';

const SET_USER = 'user/SET'
const UNSET_USER = 'user/UNSET'

export const set = user => ({
  type: SET_USER,
  user
})

export const unset = () => ({
  type: UNSET_USER,
  user: null
})

export const setSessionUser = credentials => async dispatch => {
  console.log(credentials);
   
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  });

  if( response.ok ){
    const user = await response.json();
    dispatch(set(user))
    return null;
  } else {
    const data = await response.json();
    return data?.errors;
  }

};

export default function sessionUserReducer(state = null, action) {
  switch(action.type){
    case SET_USER:
      return {...state, user: action.user}
    case UNSET_USER:
      return {...state, user: action.user}
    default:
      return state
  }
}
