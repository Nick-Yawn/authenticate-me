import { csrfFetch } from './csrf.js';

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT  = 'spots/GET_SPOT';

const getSpotsAction = spots => ({
  type: GET_SPOTS,
  spots
})

const getSpotAction = spot => ({
  type: GET_SPOT,
  spot
})

// TODO: update method to use search params
export const getSpots = () => async dispatch => {
  const response = await fetch('/api/spots');
  const data = await response.json();

  if( response.ok ){
    await dispatch(getSpotsAction(data.spots));
    return null; 
  } else {
    return data?.errors;
  }
}

export const getSpot = id => async dispatch => {
  const response = await fetch(`/api/spots/${id}`);
  const data = await response.json();

  if( response.ok ){
    await dispatch(getSpotAction(data.spot))
  } else {
    return data?.errors
  }
}

export const postSpot = spotToPost => async dispatch => {
  const response = await csrfFetch('/api/spots',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spotToPost)
  })
  const data = await response.json();
  
  if( response.ok ){
    await dispatch(getSpotAction(data.spot));
    return { errors: [], ok: true, id: data.spot.id }
  } else {
    return { errors: data.errors, ok: false, id: null }
  }

}

export default function spotsReducer(state = null, action) {
  let newState = {};
  switch(action.type){
    case GET_SPOTS:
      action.spots.forEach( spot => newState[spot.id] = spot)
      return newState;
    case GET_SPOT:
      return {...state, [action.spot.id]: action.spot}
    default:
      return state;
  }
}
