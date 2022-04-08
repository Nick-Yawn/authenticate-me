import { csrfFetch } from './csrf.js';

const GET_DISTRICTS = 'districts/GET_DISTRICTS'

const getDistrictsAction = districts => ({
  type: GET_DISTRICTS,
  districts
})

export const getDistricts = () => async dispatch => {
  const response = await fetch('/api/districts');
  const data = await response.json();

  if( response.ok ){
    await dispatch(getDistrictsAction(data.districts));
    return null;
  } else {
    return data?.errors;
  }
}

export default function districtsReducer(state = null, action) {
  let newState = {};
  switch(action.type){
    case GET_DISTRICTS:
      action.districts.forEach( d => newState[d.id] = d);
      return newState; 
    default:
      return state;
  }
}
