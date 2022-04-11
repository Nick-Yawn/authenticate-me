import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, getImages, deleteImage } from '../../store/images';
import { getSpot } from '../../store/spots';

import './ImageManager.css'

export default function ImageManager({ spot }){
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ visible, setVisible ] = useState(false);
  const images = useSelector( state => state.images ); 

  useEffect(()=>{
    if( id ) dispatch(getImages(id));
  },[dispatch]); 


  const openImageManager = e => setVisible(true);
  const closeImageManager = e => setVisible(false);

  const uploadFile = async (file, signedRequest, url) => {
    const response = await fetch(signedRequest, {
      method: 'PUT',
      body: file
    })
    if( response.ok ){
      return url;
    } else {
      return null;
    }
  }

  const handleFiles = async e => {
    const files = e.target.files;
    const statuses = new Array(files.length);
    if( files.length === 0 ) return;
    for( let i = 0; i < files.length; i++ ){
      const file = files[i]
      const response1 = await fetch(`/api/aws/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      const data = await response1.json(); 
  
      if( response1.ok ){
          
        const imageUrl = await uploadFile(file, data.signedRequest, data.url) 
         
        if( imageUrl ){
          const response = await dispatch(addImage(id, imageUrl));
          if( response.ok ){
            statuses[i] = 'SUCCESS'
            dispatch(getSpot(id)); 
          } else {
            statuses[i] = response.errors
          }
          
        } else {
          statuses[i] = 'Successfully got signed url, but was unable to upload.'
        }    
        
      } else {
        statuses[i] = 'Could not get signed url.'
      }
      
    }
    
  }

  const getDeleteHandler = (imgId, spotId) => async e => {
    const error = await dispatch(deleteImage(imgId));
    if( error ){
      alert(error);
    } else {
      dispatch(getSpot(spotId)); 
    }
  };

  return (
    <>
    <button className="image-manager-button control-button" onClick={openImageManager}>Image Manager</button> 
      {visible && (
        <div className="images-modal">
          <div className="images-modal-background" onClick={closeImageManager} />
          <div className="images-modal-content">
            <div className="images-modal-list">
            { images && Object.values(images).map( (img, i) => (
              <div key={i} className="image-manager-image">
                <i className="fa-solid fa-xmark-large" onClick={getDeleteHandler(img.id, id)}/>
                <div className='img-thumbnail' style={{backgroundImage: `url(${img.url})`}} />
                {img.url.slice(47)}
              </div>
            ))}
            </div>
            <input type="file" id="img-input" name="img-input"  multiple accept=".png,.jpg,.jpeg" onChange={handleFiles}/>
            <label htmlFor="img-input" className="img-input-label">Select Images</label>
          </div>
        </div>
  
      )}
    </>
  )

}
