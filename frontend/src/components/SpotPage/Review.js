import { useState } from 'react';
import { updateReviews, deleteReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { getSpot } from '../../store/spots'
import ReviewForm from './ReviewForm';

export default function Review({ review, spot, user }) {
  const dispatch = useDispatch();
  const [ editing, setEditing ] = useState(false);

  const dispatchDeleteReview = async e => { 
    const success = await dispatch(deleteReview(review.id));
    if( success ){
      await dispatch(getSpot(spot.id))
      await dispatch(updateReviews(spot?.Reviews))
    } else {
      alert('Unable to delete review')
    }
  };

  const toggleEditing = e => {
    setEditing(!editing)
  }

  return(
      <div  className="review spot-info">
        <div className="review-body">" {review.body} " –{review.User?.username} </div>
        { editing && ( <ReviewForm spot={spot} review={review} setEditing={setEditing} /> ) }
        { review.User?.id === user?.id && (
          <div className="review-buttons">
            <button className="control-button edit-button review-button" onClick={toggleEditing}>{editing ? 'Cancel Edit' : 'Edit'}</button>
            <button className="control-button delete-button review-button" onClick={dispatchDeleteReview}>Delete</button> 
          </div>
        )}
      </div>
    )
}
