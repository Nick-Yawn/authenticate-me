import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addReview } from '../../store/spots';
import { updateReviews } from '../../store/reviews';

export default function ReviewForm({ spot }) {
  const dispatch = useDispatch();
  const [ body, setBody ] = useState('');
  const [ errors, setErrors ] = useState([]); 
  const user = useSelector( state => state.session?.user )

  const handleSubmit = async e => {
    e.preventDefault();
    if( body.length < 2 ){
      return alert('Your review must have a meaningful length.')
    }

    const result = await dispatch(addReview(spot, body));
    if( result.ok ) {
      setBody('');
      dispatch(updateReviews(result.reviews));
    } else {
      setErrors(result.errors);
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
      <button className="review-submit-button control-button">Submit Review</button>
    </form>
  ); 
}
