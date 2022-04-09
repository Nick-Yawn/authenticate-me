const SET_SPOT_TO_EDIT = 'spotToEdit/SET'

const setSpotToEditAction = spot => ({
  type: SET_SPOT_TO_EDIT,
  spot
})

export const setSpotToEdit = spot => async dispatch => {
  await dispatch(setSpotToEditAction(spot));
}

export default function spotToEditReducer( state = null, action ){
  switch(action.type){
    case SET_SPOT_TO_EDIT:
      return {...action.spot}
    default:
      return state;
  }
}
