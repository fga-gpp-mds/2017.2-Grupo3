import { logWarn } from '../../../../logConfig/loggers';
import { INTERNAL_ERROR } from '../../../constants/toastMessages';
import ShowToast from '../../../components/Toast';
import { FILE_NAME } from '../../schedulingMeetingActions';

/* This function logs posting Meeting errors based
  on the response code from Nuvem Cívica */
export const treatingPostsError = (error) => {
  const ERROR_TYPE = 'treatingPostsError';

  if (error.response.status === 401) {
    logWarn(FILE_NAME, ERROR_TYPE,
      `Unauthorized according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 403) {
    logWarn(FILE_NAME, ERROR_TYPE,
      `Forbidden according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 404) {
    logWarn(FILE_NAME, ERROR_TYPE,
      `Not Found according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else {
    logWarn(FILE_NAME, ERROR_TYPE,
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};

/* This function logs errors about Meeting format/post based
  on the response code from Nuvem Cívica */
export const treatingGetMeetingScheduleContentError = (error) => {
  const ERROR_TYPE = 'treatingGetMeetingScheduleContentError';

  if (error.response.status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Nuvem Cívica Internal Server Error - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 404) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Post or Content not found with this params - Error code received in request - ${error.response.status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};

/* This function logs errors about Meeting search/get based
  on the response code from Nuvem Cívica */
export const treatingGetMeetingSchedulePostListError = (error) => {
  const ERROR_TYPE = 'treatingGetMeetingSchedulePostListError';

  if (error.response.status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Nuvem Cívica Internal Server Error - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${error.response.status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, ERROR_TYPE,
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};
