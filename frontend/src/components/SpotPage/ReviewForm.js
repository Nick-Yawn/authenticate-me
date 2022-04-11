import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addReview } from '../../store/spots';
import { getSpot } from '../../store/spots'
import { updateReviews, editReview } from '../../store/reviews';

export default function ReviewForm({ spot, review, setEditing }) {
  const dispatch = useDispatch();
  const [ body, setBody ] = useState(review?.body);
  const [ errors, setErrors ] = useState([]); 
  const user = useSelector( state => state.session?.user )

  const handleSubmit = async e => {
    e.preventDefault();
    if( body.length < 2 ){
      return alert('Your review must have a meaningful length.')
    }

    if( review ){ // PUT ROUTE
      const result = await dispatch(editReview(review, body));
      if( result.ok ){
        await dispatch(getSpot(spot.id));
        await dispatch(updateReviews(spot?.Reviews));
        setEditing(false);
        // the way I am rehydrating state here is pretty hacky.
        // however, I am on a significant time crunch.
        // TODO: clean up state management
      } else {
        console.log(result.errors);
        return alert('Unable to edit review. Please try again later.'); 
      } 
 
    } else { // POST ROUTE
      const result = await dispatch(addReview(spot, body));
      if( result.ok ) {
        setBody('');
        dispatch(updateReviews(result.reviews));
      } else {
        console.log(result.errors);
        return alert('Unable to post review.');
      }
    }
  }

  const updateBody = e => setBody(e.target.value); 
 
  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea 
        placeholder="Leave your review..."
        value={body}
        className="review-input"
        onChange={updateBody}
      /> 
      <button className="review-submit-button control-button">{ review ? 'Edit' : 'Submit'} Review</button>
    </form>
  ); 
}
