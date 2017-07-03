import {FLASH_MESSAGE} from '../actions/flashActions';

const initialState = {
  message: null,
  style: null

}

export default function reducer(state=initialState, action) {
  switch(action.type){
    case FLASH_MESSAGE:
      console.log('Fash reducer', action.payload)
      return action.payload;
    case '@@router/LOCATION_CHANGE':
      console.log('Fash reducer - LOCATION_CHANGE', action.payload)
      return initialState;
    default:
      return {...state};
  }
};
