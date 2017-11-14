import { ADDRESS_ERROR,
         ADDRESS_FETCHED,
         CLEAR_DATA } from '../actions';

const INITIAL_STATE = { error: '', message: '', totalUSD: '', totalCrypto: '', addressesArr: []}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADDRESS_ERROR:
      return { ...state, error: action.payload };

    case ADDRESS_FETCHED:
      return { ...state, totalUSD: action.payload.totalUSD, totalCrypto: action.payload.totalCrypto, addressesArr: action.payload.addressData };

    case CLEAR_DATA:
      return { ...state, error: '', message: '', totalUSD:'', totalCrypto:'', addressesArr:[]}
  }

  return state;
}
