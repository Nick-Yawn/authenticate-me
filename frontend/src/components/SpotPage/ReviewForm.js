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
      { errors?.length > 0 && (
        <ul>
          {errors.map( (e, i) => (<li key={i}>e.message</li>))}
        </ul>
      )}
      <textarea 
        placeholder="Leave your review..."
        value={body}
        onChange={updateBody}
      /> 
      <button>Submit Review</button>
    </form>
  ); 
}
