import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAmenities } from '../../store/amenity';
import { getDistricts } from '../../store/district';
import { getSessionUser } from '../../store/session';
import { postSpot } from '../../store/spots';
import { ModalContext } from '../../context/Modal';

import './SpotForm.css'

export default function SpotForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setShowModal } = useContext(ModalContext);
  const user          = useSelector(state => state.session?.user);
  const spotToEdit    = useSelector(state => state.spotToEdit);
  const amenitiesList = useSelector(state => state.amenities);
  const districtsList = useSelector(state => state.districts);
 /* const [ img1, setImg1 ]       = useState(''); 
  const [ img2, setImg2 ]       = useState('');
  const [ img3, setImg3 ]       = useState(''); 
  const [ img4, setImg4 ]       = useState(''); 
  const [ img5, setImg5 ]       = useState(''); */
  const [ name, setName ]       = useState(spotToEdit?.name || '') // REQ
  const [ address, setAddress ] = useState(spotToEdit?.address || '')
  const [ city, setCity ]       = useState(spotToEdit?.city || '') // REQ
  const [ state, setState ]     = useState(spotToEdit?.state || '')
  const [ country, setCountry ] = useState(spotToEdit?.country || '') // REQ
  const [ description, setDescription ] = useState(spotToEdit?.description || '') // REQ
  const [ price, setPrice ]             = useState(spotToEdit?.price || 0) // REQ
  const [ districtId, setDistrictId ]   = useState(spotToEdit?.districtId || null)
  const [ amenities, setAmenities ]     = useState(spotToEdit?.Amenities?.map(a => a.id) || [])
  const [ visible, setVisible ]         = useState(spotToEdit?.visible);
  const [ images, setImages ]   = useState([]);
  const [ errors, setErrors ]   = useState([]);
  const [ visibilityErrorExists, setVisibilityErrorExists ]   = useState(true);
  //  TODO: set saved on change of field, prompt before redirect

  // images...

  // Load amenities and districts. Could do this on initial load.
  useEffect( ()=>{
    dispatch(getAmenities());
    dispatch(getDistricts());
  },[dispatch])


  // Ensure cities that aren't night city don't get districts 
  useEffect(()=>{
    if( districtId && city !== "Night City" ){
      setDistrictId(null);
    }
  },[city]);

  // update visibilityErrors array
  useEffect(()=>{
    if( !name || !description || !city || !country || !price ){
      setVisible(false);
      setVisibilityErrorExists(true);
    }else
      setVisibilityErrorExists(false); 
  },[name, description, city, country, price])
  
  // event handlers 
/*  const updateImg1        = e => setImg1(       e.target.value);
  const updateImg2        = e => setImg2(       e.target.value);
  const updateImg3        = e => setImg3(       e.target.value);
  const updateImg4        = e => setImg4(       e.target.value);
  const updateImg5        = e => setImg5(       e.target.value);*/
  const updateName        = e => setName(       e.target.value);
  const updateAddress     = e => setAddress(    e.target.value);
  const updateCity        = e => setCity(       e.target.value);
  const updateState       = e => setState(      e.target.value);
  const updateCountry     = e => setCountry(    e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updatePrice       = e => setPrice(      e.target.value);
  const updateDistrictId  = e => setDistrictId( e.target.value);
  // amenities event handler
  const updateAmenities   = id => e => {
    let newAmenities = [];
    if( amenities.indexOf(id) !== -1 ){ 
      const indexOfAmenity = amenities.indexOf(id);
      newAmenities = [...amenities.slice(0,indexOfAmenity),  ...amenities.slice(indexOfAmenity + 1) ];
    } else {
      newAmenities = [...amenities, id]
    }
    setAmenities(newAmenities);
  };
  // visibility checkbox event handler, with error alert
  const updateVisible  = e => {
    setVisible(!visible);
  };

  // submit
  const handleSubmit = async e => {
    e.preventDefault();
    const spotToPost = {
      name,
      address,
      city,
      state,
      country,
      districtId,
      price: typeof Number(price) === 'number' ? Number(price) : 0,
      description,
      amenities,
      visible
    }
  
    if( spotToEdit ) spotToPost.id = spotToEdit.id;

    // result format is { errors: [], ok: Boolean, id: }
    const result = await dispatch(postSpot(spotToPost)) 
    console.log(result);
    if( !result.ok ){ 
      if( result.errors )
        setErrors(result.errors)
      else if( result.message )
        setErrors([result.message])
    } else {
      dispatch(getSessionUser());
      history.push(`/spots/${result.id}`)
      setShowModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="spot-form">
      <ul>
        {errors && errors.map( (e,i) => <li key={i}>{e}</li> )}
      </ul>

      <label>
        <input type="file"
          accept=".jpg, .jpeg .png"
          multiple
        />
        Choose images
      </label>
      <label>
        Name
        <input
          type="text"
          placeholder="required"
          value={name}
          onChange={updateName}
        />
      </label>

      <label>
        Description
        <textarea
          placeholder="required"
          value={description}
          onChange={updateDescription}
        />
      </label>
        
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={updateAddress}
        />
      </label>

      <label>
        City
        <input
          type="text"
          placeholder="required"
          value={city}
          onChange={updateCity}
        />
      </label>
      { city === "Night City" && (
      <label>
        District
        <select
          type="text"
          value={districtId}
          onChange={updateDistrictId}
        >
            <option value={null}/>
          {districtsList && Object.values(districtsList).map(d => (
            <option value={d.id}>{d.name}</option>
          ))}  
        </select>
      </label>
      )}

      <label>
        State
        <input
          type="text"
          value={state}
          onChange={updateState}
        />
      </label>

      <label>
        Country
        <input
          type="text"
          placeholder="required"
          value={country}
          onChange={updateCountry}
        />
      </label>

      <label>
        Price per night
        <input
          type="number"
          value={price}
          onChange={updatePrice}
        />
      </label>
    
      <label className="amenities-label"> 
        Amenities
        <div className="amenities-list">
        { amenitiesList && Object.values(amenitiesList).map(a => (
          <label key={a.id} className="amenity-label">
            <input
              type="checkbox"
              name={a.name} 
              checked={amenities.includes(a.id)}
              onChange={updateAmenities(a.id)}
            />
            <i className={a.iconClass} />
            {a.name}
          </label>
        ))}
        </div>
      </label>

      <label className="visible-label" title={visibilityErrorExists ? "Additional Fields Are Required." : ''} >
        <input
          id="visible-checkbox"
          type="checkbox"
          title={visibilityErrorExists ? "Additional Fields Are Required." : ''} 
          disabled={visibilityErrorExists}
          checked={visible}
          onChange={updateVisible}
        />
        Make Available For Booking
      </label>

      <button type="submit">
        {spotToEdit && visible && "Save Changes and Host Spot"}
        {spotToEdit && !visible && "Save Changes"}
        {!spotToEdit && visible && "Host Spot"}
        {!spotToEdit && !visible && "Save Spot"}
      </button> 
    </form>
  ) 
}
