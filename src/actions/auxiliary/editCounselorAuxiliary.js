import axios from 'axios';
import { convertingJSONToString } from '../applicationActions';
// Functions focused in Edit Couselor Data
import { DEFAULT_USER_LINK_NUVEM_CIVICA } from '../../constants/linkConstants';
import { logInfo, logWarn } from '../../../logConfig/loggers';
import { errorGenerator } from '../schedulingVisitActions';
import { EDIT_PROFILE_ERROR, EDIT_ACCOUNT_ERROR } from '../../constants/errorConstants';

const FILE_NAME = 'editCounselorAuxiliary';

// Edit Counselors Profile
export const editCounselorProfile = async (counselorData) => {
  const headerToEditCounselor = {
    headers: {
      appToken: counselorData.token,
    },
  };

  const stringProfile = convertingJSONToString(counselorData.profile);

  // Creating body of PUT method.
  const bodyToEditCounselorProfile = {
    camposAdicionais: stringProfile,
    tipoPerfil: {
      codTipoPerfil: 239,
    },
  };

  try {
    await axios.put(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorData.nuvemCode}/perfil`, bodyToEditCounselorProfile, headerToEditCounselor,
    );

    logInfo(FILE_NAME, 'editCounselorProfile',
      `Counselor Profile edited. Sending to Store: ${counselorData.name} and ${JSON.stringify(counselorData.profile, null, 2)}`);
  } catch (error) {
    logWarn(FILE_NAME, 'editCounselorProfile',
      `Request result in an ${error}`);
    throw errorGenerator(EDIT_PROFILE_ERROR, error.response.status);
  }
};

// Edit Counselor
export const editAccountData = async (counselorData) => {
  const headerToEditCounselor = {
    headers: {
      appToken: counselorData.token,
    },
  };

  const bodyToEditCounselor = {
    nomeCompleto: counselorData.name,
    nomeUsuario: counselorData.userName,
  };

  try {
    const response = await axios.put(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorData.nuvemCode}`, bodyToEditCounselor, headerToEditCounselor,
    );

    logInfo(FILE_NAME, 'editCounselor',
      `User data of Counselor edited: ${JSON.stringify(response.data, null, 2)}`);
  } catch (error) {
    logWarn(FILE_NAME, 'editCounselor',
      `Request result in an ${error.stack}`);
    throw errorGenerator(EDIT_ACCOUNT_ERROR, error.response.status);
  }
};
