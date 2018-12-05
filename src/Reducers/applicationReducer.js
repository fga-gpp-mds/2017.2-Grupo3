import initialState from './initialState';
import {
  IS_LOADING,
  IS_NOT_LOADING,
} from '../actions/types';
// import { logTrace, logError } from '../../logConfig/loggers';
//
// const FILE_NAME = 'applicationReducer.js';

const applicationReducer = (state = initialState.application, action) => {
  // logTrace(FILE_NAME, 'applicationReducer',
  //   `Action Type received: ${action.type}`);

  if (action === undefined) {
    // logWarn(FILE_NAME, 'applicationReducer',
    //   `Action is undefined: ${JSON.stringify(action, null, 2)}`);

    return state;
  }

  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
        clickableView: 'none',
      };
    case IS_NOT_LOADING:
      return {
        ...state,
        isLoading: false,
        clickableView: 'auto',
      };
    default:
      return state;
  }
};

export default applicationReducer;
