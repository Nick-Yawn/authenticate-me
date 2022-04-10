const UPDATE_REVIEWS = 'reviews/UPDATE'

const updateReviewsAction = reviews => ({
  type: UPDATE_REVIEWS,
  reviews
})

export const updateReviews = reviews => async dispatch => {
  dispatch(updateReviewsAction(reviews));
}

export default function reviewsReducer(state=null, action) {
  switch(action.type){
    case UPDATE_REVIEWS:
      return { ...action.reviews } 
    default:
      return state;
  }
}
