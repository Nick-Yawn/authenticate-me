import { csrfFetch } from './csrf.js';

const GET_AMENITIES = 'amenities/GET_AMENITIES'

const getAmenitiesAction = amenities => ({
  type: GET_AMENITIES,
  amenities
})

export const getAmenities = () => async dispatch => {
  const response = await fetch('/api/amenities');
  const data = await response.json();

  if( response.ok ){
    await dispatch(getAmenitiesAction(data.amenities));
    return null;
  } else {
    return data?.errors;
  }
}

export default function amenitiesReducer(state = null, action) {
  let newState = {};
  switch(action.type){
    case GET_AMENITIES:
      action.amenities.forEach( a => newState[a.id] = a);
      return newState; 
    default:
      return state;
  }
}
