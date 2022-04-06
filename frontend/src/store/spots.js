import { csrfFetch } from './csrf.js';

const SET_SPOTS = 'spots/SET';

const setSpotsAction = spots => ({
  type: SET_SPOTS,
  spots
})

export const setSpots = () => async dispatch => {
  const response = await fetch('/api/spots');
  const data = await response.json();

  if( response.ok ){
    await dispatch(setSpotsAction(data.spots));
    return null; 
  } else {
    return data?.errors;
  }
}

export default function spotsReducer(state = null, action) {
  switch(action.type){
    case SET_SPOTS:
      return {...action.spots} 
    default:
      return state
  }
}
