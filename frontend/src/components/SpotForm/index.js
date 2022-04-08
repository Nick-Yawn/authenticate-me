import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAmenities } from '../../store/amenity';
import { getDistricts } from '../../store/district';
import { postSpot } from '../../store/spots';

import './SpotForm.css'

export default function SpotForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  const spotToEdit = useSelector(state => state.spotToEdit);
  const amenitiesList = useSelector(state => state.amenities);
  const districtsList = useSelector(state => state.districts)
  const [ name, setName] = useState('') // REQ
  const [ address, setAddress ] = useState('')
  const [ city, setCity ] = useState('') // REQ
  const [ state, setState ] = useState('')
  const [ country, setCountry] = useState('') // REQ
  const [ description, setDescription ] = useState('') // REQ
  const [ price, setPrice] = useState( 0 ) // REQ
  const [ districtId, setDistrictId ] = useState(null)
  const [ amenities, setAmenities ] = useState([])
  const [ images, setImages ] = useState([])
  const [ errors, setErrors ] = useState([]);
  const [ visible, setVisible ] = useState(false);
  //  TODO: set saved on change of field, prompt before redirect
  //const [ saved, setSaved ] = useState(true);

  // images...

  // Load amenities and districts
  useEffect(()=>{
    dispatch(getAmenities());
    dispatch(getDistricts());
  },[dispatch])


  // Ensure cities that are not night city don't get districts 
  useEffect(()=>{
    if( districtId && city !== "Night City" ){
      setDistrictId(null);
    }
  },[city]);

  // load spot into controlled inputs
  if(spotToEdit){
    setName(spotToEdit?.name);
    setAddress(spotToEdit?.address);
    setCity(spotToEdit?.city);
    setState(spotToEdit?.state);
    setCountry(spotToEdit?.country);
    setDescription(spotToEdit?.description);
    setPrice(spotToEdit?.price);
    setDistrictId(spotToEdit?.districtId);
    setAmenities(spotToEdit?.Amenities);
  }
  
  // event handlers 
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
    if(visible) setVisible(false)
    else {
      let str = 'The following fields must be completed to begin hosting:\n\n';
      let visibilityErrors = false;
      if( !name || !description || !city || !country || !price )
        visibilityErrors = true;
      if( !name ) str += 'Name\n';
      if( !description ) str += 'Description\n';
      if( !city ) str += 'City\n';
      if( !country ) str += 'Country\n';
      if( !price ) str += 'Price\n';
      
      if( visibilityErrors ) 
        alert(str) 
      else
        setVisible(true);
    }
  };

  // submit
  const handleSubmit = async e => {
    e.preventDefault();
    const spotToPost = {
      name,
      address,
      city,
      state,
      districtId,
      price,
      description,
      amenities,
      visible
    }
  
    if( spotToEdit ) spotToPost.id = spotToEdit.id;
 
    // result format is { errors: [], ok: Boolean, id: }
    const result = await dispatch(postSpot(spotToPost)) 
    if( !result.ok ){ 
      setErrors(result.errors);
    } else {
      history.push(`/spots/${result.id}`)
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="spot-form">
      <ul>
        {errors.map( (e,i) => <li key={i}>{e}</li> )}
      </ul>

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

      <label className="visible-label">
        <input
          id="visible-checkbox"
          type="checkbox"
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
