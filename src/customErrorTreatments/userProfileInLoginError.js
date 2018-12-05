import ShowToast from '../components/Toast';
import { INTERNAL_ERROR, LOGIN_PROFILE_ERROR } from '../constants/toastMessages';
import { logWarn } from '../../logConfig/loggers';

const FILE_NAME = 'userProfileInLoginError';

// Trating request errors
const getUserProfileInLoginErrorHandler = (status) => {
  if (status === 404) {
    ShowToast.Toast(LOGIN_PROFILE_ERROR);
    logWarn(FILE_NAME, 'getUserProfileInLoginErrorHandler',
      `User isn't register in application or Profile didn't find for this user - Error code received in request - ${status}`);
  } else if (status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'getUserProfileInLoginErrorHandler',
      `Nuvem Cívica Internal Server Error - Error code received in request - ${status}`);
  } else if (status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'getUserProfileInLoginErrorHandler',
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'getUserProfileInLoginErrorHandler',
      `Unknown error - Error code received in request - ${status}`);
  }
};

export default getUserProfileInLoginErrorHandler;
