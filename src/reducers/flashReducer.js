import {FLASH_MESSAGE} from '../actions/flashActions';

const initialState = {
  message: null,
  style: null

}

export default function reducer(state=initialState, action) {
  switch(action.type){
    case FLASH_MESSAGE:
      return action.payload;
    case '@@router/LOCATION_CHANGE':
      return initialState;
    default:
      return {...state};
  }
};
