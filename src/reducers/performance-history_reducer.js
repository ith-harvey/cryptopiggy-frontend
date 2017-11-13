import { PERFORM_HISTORY_FETCHED, PERFORM_HISTORY_ERROR } from '../actions';

const INITIAL_STATE = { error: '', message: '', oneMonthAgo: '', oneYearAgo: '', sixMonthsAgo: '', oneWeekAgo: '', aDayAgo: '', whenCreated: ''}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case PERFORM_HISTORY_ERROR:
      return { ...state, error: action.payload };

    case PERFORM_HISTORY_FETCHED:
        return { ...state,
          oneMonthAgo: action.payload.oneMonthAgo,
          oneYearAgo: action.payload.oneYearAgo,
          sixMonthsAgo: action.payload.sixMonthsAgo,
          whenCreated: action.payload.whenCreated,
          oneWeekAgo: action.payload.oneWeekAgo,
          aDayAgo: action.payload.aDayAgo
        };
  }

  return state;
}
