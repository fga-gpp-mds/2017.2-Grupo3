import initialState from './initialState';
import {
  SET_MEETING_LOCATION_LATITUDE,
  SET_MEETING_LOCATION_LONGITUDE,
  RESET_SCHEDULE_MEETING,
} from '../actions/types';
// import { logInfo } from '../../logConfig/loggers';

// const FILE_NAME = 'schoolReducer.js';

const scheduleMeetingReducer = (state = initialState.scheduleMeeting, action) => {
  if (action === undefined) {
    // logWarn(FILE_NAME, 'schoolReducer',
    //   `ERROR: Action is undefined: ${JSON.stringify(action, null, 2)}`);

    return state;
  }

  switch (action.type) {
    case SET_MEETING_LOCATION_LATITUDE:
      return {
        ...state,
        meetingLatitude: action.payload.latitude,
      };
    case SET_MEETING_LOCATION_LONGITUDE:
      return {
        ...state,
        meetingLongitude: action.payload.longitude,
      };
    case RESET_SCHEDULE_MEETING:
      return {
        codSchool: 0,
        meetingLatitude: null,
        meetingLongitude: null,
      };
    default:
      return state;
  }
};

export default scheduleMeetingReducer;
