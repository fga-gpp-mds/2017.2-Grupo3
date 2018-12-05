import { logWarn } from '../../logConfig/loggers';
import ShowToast from '../components/Toast';
import { INTERNAL_ERROR } from '../constants/toastMessages';

const FILE_NAME = 'schedulingVisitActions.js';

// Trating request errors
const treatingError = (status) => {
  if (status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingerror',
      `Nuvem Cívica Internal Server Error - Error code received in request - ${status}`);
  } else if (status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingerror',
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingerror',
      `Unknown error - Error code received in request - ${status}`);
  }
};

export default treatingError;
