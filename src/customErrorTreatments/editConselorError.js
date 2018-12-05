import ShowToast from '../components/Toast';
import INTERNAL_ERROR from '../constants/toastMessages';
import { logWarn } from '../../logConfig/loggers';

const FILE_NAME = 'editConselorError';

// Trating request errors
const editConselorErrorHandler = (status) => {
  if (status === 401) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'editConselorErrorHandler',
      `Unauthorized according to the Nuvem - Error code received in request - ${status}`);
  } else if (status === 403) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'editConselorErrorHandler',
      `Forbidden according to the Nuvem - Error code received in request - ${status}`);
  } else if (status === 404) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'editConselorErrorHandler',
      `Not Found according to the Nuvem - Error code received in request - ${status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'editConselorErrorHandler',
      `Unknown error - Error code received in request - ${status}`);
  }
};

export default editConselorErrorHandler;
