import { csrfFetch } from './csrf.js';

const GET_IMAGES = 'images/GET_ALL'
const ADD_IMAGE = 'images/ADD';

const getImagesAction = images => ({
  type: GET_IMAGES,
  images
})

const addImageAction = image => ({
  type: ADD_IMAGE,
  image
})

export const getImages = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}/images`);
  const data = response.json();

  if( response.ok ){
    dispatch(getImagesAction(data.images));
  } else {
    console.log('Unable to get images.') 
  }
}

export const addImage = (id, url) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}/images`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({url}) 
  })
  const data = await response.json();

  if( response.ok ){
    dispatch(addImageAction(data.image));
    return {ok: true}
  } else {
    return {ok: false, errors: data.errors} 
  }
  
}

export default function imagesReducer (state = null, action) {
  let newState = {};
  switch(action.type){
    case GET_IMAGES:
      if( action.images?.length > 0 ) action.images.forEach( i => newState[i.id] = i)
      return newState;
    case ADD_IMAGE:
      newState = {...state};  
      newState[action.image.id] = action.image
      return newState;
    default:
      return state;
  } 
}
