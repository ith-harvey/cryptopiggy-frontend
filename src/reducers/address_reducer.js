import { ADDRESS_ERROR } from '../actions';

const INITIAL_STATE = { error: '', message: ''}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADDRESS_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
