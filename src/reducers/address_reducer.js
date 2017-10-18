import { ADDRESS_ERROR,
         ADDRESS_FETCHED } from '../actions';

const INITIAL_STATE = { error: '', message: '', addressesArr: []}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADDRESS_ERROR:
      return { ...state, error: action.payload };

    case ADDRESS_FETCHED:
        return { ...state, addressesArr: action.payload };
  }

  return state;
}
