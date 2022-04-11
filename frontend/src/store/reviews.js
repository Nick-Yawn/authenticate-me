import { csrfFetch } from './csrf.js';

const UPDATE_REVIEWS = 'reviews/UPDATE_ALL'
const DELETE_REVIEW = 'reviews/DELETE'
const UPDATE_REVIEW = 'reviews/UPDATE_ONE'

const updateReviewsAction = reviews => ({
  type: UPDATE_REVIEWS,
  reviews
})

const deleteReviewAction = id => ({
  type: DELETE_REVIEW,
  id
})

const updateReviewAction = review => ({
  type: UPDATE_REVIEW,
  review
})

export const updateReviews = reviews => async dispatch => {
  dispatch(updateReviewsAction(reviews));
}

export const deleteReview = id => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${id}`, {method: 'DELETE'}); 
  const data = await response.json();

  if( response.ok ){
    await dispatch(deleteReviewAction(data.id));
    return true;
  } else {
    return false;
  }
}

export const editReview = (review, body) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${review.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({body}) 
  })
  const data = await response.json();

  if( response.ok ){
    await dispatch(updateReviewAction(data))
    return {ok: true} 
  } else { 
    return {ok: false} 
  }
} 

export default function reviewsReducer(state=null, action) {
  let newState = {};
  switch(action.type){
    case UPDATE_REVIEWS:
      if( action.reviews ) action.reviews.forEach( r => newState[r.id] = r);
      return newState
    case DELETE_REVIEW:
      newState = {...state};
      delete newState[action.id];
      return newState;
    case UPDATE_REVIEW:
      newState = {...state};
      newState[action.review.id] = action.review;
    default:
      return state;
  }
}
