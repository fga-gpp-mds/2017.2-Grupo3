import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { authenticatingMasterCounselor } from './ManagerRegisterActions';
import {
  SET_COUNSELOR,
  SET_TOKEN,
  SET_COUNSELOR_EDITED,
} from './types';
import { isLoading, isNotLoading, convertingJSONToString } from './applicationActions';
import { logInfo, logWarn } from '../../logConfig/loggers';
import {
  LOGIN_SUCCEED,
  INTERNAL_ERROR,
  REGISTER_SUCCEED,
  REGISTER_NUVEM_ERROR,
} from '../constants/toastMessages';
import {
  LOGIN_PASSWORD_ERROR,
} from '../constants/toastMessages';
import {
  REGISTER_FAIL_TITLE,
  USER_ALREADY_REGISTER_IN_APPLICATION,
  USER_JUST_ALREADY_REGISTER_IN_NUVEM,
} from '../constants/alertTitlesMessages';
import {
  AUTHENTICATE_LINK_NUVEM_CIVICA,
  DEFAULT_USER_LINK_NUVEM_CIVICA,
  DEFAULT_GROUP_LINK_NUVEM_CIVICA,
} from '../constants/linkConstants';
import {
  APP_IDENTIFIER,
  PROFILE_TYPE_CODE,
} from '../constants/codeNumbers';
import ShowToast from '../components/Toast';
import {
  AUTH_LOGIN_ERROR,
  PROFILE_LOGIN_ERROR,
  GROUP_LOGIN_ERROR,
} from '../constants/errorConstants';
import { errorGenerator } from './schedulingVisitActions';
import { editAccountData, editCounselorProfile } from './auxiliary/editCounselorAuxiliary';
import getUserProfileInLoginErrorHandler from '../customErrorTreatments/userProfileInLoginError';

const FILE_NAME = 'counselorActions.js';

// Action
export const setCounselor = counselor => ({
  type: SET_COUNSELOR,
  payload: counselor,
});

// Action
export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});

// Action
export const setCounselorEdited = counselor => ({
  type: SET_COUNSELOR_EDITED,
  payload: {
    name: counselor.name,
    profile: counselor.profile,
  },
});

// Trating request errors
const treatingAuthenticatingCounselorInRegisterError = (error) => {
  if (error.response.status === 401) {
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInRegisterError',
      `User isn't register in application or Password didn't match - Error code received in request - ${error.response.status}`);

    Alert.alert(REGISTER_FAIL_TITLE, USER_JUST_ALREADY_REGISTER_IN_NUVEM);
  } else if (error.response.status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInRegisterError',
      `Nuvem Cívica Internal Server Error - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInRegisterError',
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${error.response.status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInRegisterError',
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};

// Trating request errors
const treatingRegisterCounselorError = (error) => {
  if (error.response.status === 401) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingRegisterCounselorError',
      `Unauthorized according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 403) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingRegisterCounselorError',
      `Forbidden according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 404) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingRegisterCounselorError',
      `Not Found according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingRegisterCounselorError',
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};

// Trating request errors
const treatingAssociateProfileToCounselorError = (error) => {
  if (error.response.status === 401) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAssociateProfileToCounselorError',
      `Unauthorized according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 403) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAssociateProfileToCounselorError',
      `Forbidden according to the Nuvem - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 404) {
    ShowToast.Toast(REGISTER_NUVEM_ERROR);
    logWarn(FILE_NAME, 'treatingAssociateProfileToCounselorError',
      `User isn't register in Nuvem or Profile type doesn't exist - Error code received in request - ${error.response.status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAssociateProfileToCounselorError',
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};

// Trating request errors
const treatingVerifyUserInApplicationError = (error) => {
  if (error.response.status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingVerifyUserInApplicationError',
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${error.response.status}`);
  } else if (error.response.status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingVerifyUserInApplicationError',
      `Nuvem Cívica Internal Server Error - Error code received in request - ${error.response.status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingVerifyUserInApplicationError',
      `Unknown error - Error code received in request - ${error.response.status}`);
  }
};

// Trating request errors
const treatingAuthenticatingCounselorInLoginError = (status) => {
  logInfo(FILE_NAME, 'treatingAuthenticatingCounselorInLoginError',
    'treatingAuthenticatingCounselorInLoginError');
  if (status === 401) {
    ShowToast.Toast(LOGIN_PASSWORD_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInLoginError',
      `User isn't register in application or Password didn't match - Error code received in request - ${status}`);
  } else if (status === 500) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInLoginError',
      `Nuvem Cívica Internal Server Error - Error code received in request - ${status}`);
  } else if (status === 400) {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInLoginError',
      `Bad Request, some attribute was wrongly passed - Error code received in request - ${status}`);
  } else {
    ShowToast.Toast(INTERNAL_ERROR);
    logWarn(FILE_NAME, 'treatingAuthenticatingCounselorInLoginError',
      `Unknown error - Error code received in request - ${status}`);
  }
};

// Functions focused in Counselor Register

const addCounselorToGroup = (counselor, appToken, nuvemCode, codGroup, dispatch) => {
  const headerAddGroup = {
    headers: {
      appToken,
    },
  };
  axios.post(`${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros?codUsuario=${nuvemCode}`, { codUsuario: nuvemCode }, headerAddGroup)
    .then((response) => {
      logInfo(FILE_NAME, 'addCounselorToGroup',
        `${response.data}`);
      logInfo(FILE_NAME, 'addCounselorToGroup', JSON.stringify(response));

      let counselorWithCodGroup = counselor;
      counselorWithCodGroup = {
        ...counselorWithCodGroup,
        profile: {
          ...counselorWithCodGroup.profile,
          codGroup,
        },
      };

      dispatch(setCounselor(counselorWithCodGroup));

      dispatch(isNotLoading());

      Actions.mainScreen();
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'addCounselorToGroup',
        `Request result in an ${error}`);
      dispatch(isNotLoading());
    });
};

const createCAEGroup = async (counselor, appToken, nuvemCode, dispatch) => {
  const MASTER_TOKEN = await authenticatingMasterCounselor();

  const headerCreateGroup = {
    headers: {
      appToken: MASTER_TOKEN,
    },
  };

  const bodyCreateGroup = {
    codAplicativo: APP_IDENTIFIER,
    descricao: counselor.profile.CAE,
  };

  axios.post(DEFAULT_GROUP_LINK_NUVEM_CIVICA, bodyCreateGroup, headerCreateGroup)
    .then((response) => {
      logInfo(FILE_NAME, 'createCAEGroup',
        `${response.headers.location}`);
      // This constant gets the link of the response (http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/grupos/codGroup)
      // and returns 'grupos/codGroup'.
      const auxCodGroup = response.headers.location.substr(response.headers.location.indexOf('grupos/'));
      // This constant uses the constant above, but discard 'grupos/' and return codGroup, passed as
      // parameter in the function below.
      const codGroup = auxCodGroup.substr(7);

      addCounselorToGroup(counselor, appToken, nuvemCode, codGroup, dispatch);
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'createCAEGroup',
        `Request result in an ${error}`);

      dispatch(isNotLoading());
    });
};

const searchAGroup = (counselor, appToken, nuvemCode, dispatch) => {
  const paramsToNuvem = {
    params: {
      codAplicativo: APP_IDENTIFIER,
      descricao: counselor.profile.CAE,
    },
  };
  logInfo(FILE_NAME, 'searchAGroup',
    `params: ${JSON.stringify(paramsToNuvem, null, 2)}`);

  axios.get(DEFAULT_GROUP_LINK_NUVEM_CIVICA, paramsToNuvem)
    .then((response) => {
      if (response.data.length === 0) {
        createCAEGroup(counselor, appToken, nuvemCode, dispatch);
      } else {
        logInfo(FILE_NAME, 'searchAGroup',
          'Group already exist');
        addCounselorToGroup(counselor, appToken, nuvemCode, response.data[0].codGrupo, dispatch);
      }
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'searchAGroup',
        `Request result in an ${error}`);

      dispatch(isNotLoading());
    });
};

// Used in Async Action to Register Counselor
const associateProfileToCounselor = (appToken, nuvemCode, userData, dispatch) => {
  // Creating header to send in POST method.
  const headerWithAppToken = {
    headers: {
      appToken,
    },
  };

  const stringProfile = convertingJSONToString(userData.profile);
  logInfo(FILE_NAME, 'associateProfileToCounselor',
    `String to be send to "camposAdicionais": ${stringProfile}`);

  // Creating body of POST method.
  const associateProfileBody = {
    camposAdicionais: stringProfile,
    tipoPerfil: {
      codTipoPerfil: PROFILE_TYPE_CODE,
    },
  };

  axios.post(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${nuvemCode}/perfil`, associateProfileBody, headerWithAppToken)
    .then((response) => {
      logInfo(FILE_NAME, 'associateProfileToCounselor',
        `Profile setted : ${JSON.stringify(response.data, null, 2)}`);

      const counselor = {
        nuvemCode,
        email: userData.email,
        name: userData.name,
        userName: userData.email,
        password: userData.password,
        token: appToken,
        profile: userData.profile,
      };
      logInfo(FILE_NAME, 'associateProfileToCounselor',
        `counselor dispatched to Store : ${JSON.stringify(counselor, null, 2)}`);

      searchAGroup(counselor, appToken, nuvemCode, dispatch);
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'associateProfileToCounselor',
        `Request result in an ${error}`);

      treatingAssociateProfileToCounselorError(error);

      // Setting state loading false, to deactivate the loading spin.
      dispatch(isNotLoading());
    });
};

// Used in Async Action to Register Counselor
const authenticatingUserInRegister = (userData, dispatch) => {
  const authenticationHeader = {
    headers: {
      email: userData.email,
      senha: userData.password,
    },
  };

  axios.get(AUTHENTICATE_LINK_NUVEM_CIVICA, authenticationHeader)
    .then((response) => {
      logInfo(FILE_NAME, 'authenticatingUserInRegister',
        `User authenticated successfully, his token received from Nuvem Cívica is: ${response.headers.apptoken}`);

      logInfo(FILE_NAME, 'authenticatingUserInRegister',
        `User response data received from authentication: ${JSON.stringify(response.data, null, 2)}`);

      associateProfileToCounselor(response.headers.apptoken, response.data.cod, userData, dispatch);

      ShowToast.Toast(REGISTER_SUCCEED);
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'authenticatingUserInRegister',
        `Request result in an ${error}`);

      treatingAuthenticatingCounselorInRegisterError(error);

      // Setting state loading false, to deactivate the loading spin.
      dispatch(isNotLoading());
    });
};

// Used in Async Action to Register Counselor
const verifyUserInApplication = (userData, dispatch) => {
  // Creating query params and header to pass through GET method.
  const searchUserParamsAndHeader = {
    params: {
      codAplicativo: APP_IDENTIFIER,
    },
    headers: {
      email: userData.email,
    },
  };

  // This request search all users by full name or part of the name,
  // who have registered in an application.
  axios.get(DEFAULT_USER_LINK_NUVEM_CIVICA, searchUserParamsAndHeader)
    .then((response) => {
      logInfo(FILE_NAME, 'verifyUserInApplication',
        `response content: ${JSON.stringify(response.data, null, 2)}`);

      // User already register.
      if (response.status === 200) {
        logInfo(FILE_NAME, 'verifyUserInApplication',
          `User already register in application - Response status code: ${response.status}`);

        Alert.alert(REGISTER_FAIL_TITLE, USER_ALREADY_REGISTER_IN_APPLICATION);

        // Setting state loading false, to deactivate the loading spin.
        dispatch(isNotLoading());

        // User register just in Nuvem Cívica.
      } else if (response.status === 204) {
        logInfo(FILE_NAME, 'verifyUserInApplication',
          `User isn't register in application - Response status code: ${response.status}`);

        // Trying register a user, that has a Nuvem Cívica record, in our application.
        authenticatingUserInRegister(userData, dispatch);
      } else {
        logInfo(FILE_NAME, 'verifyUserInApplication',
          `Unknown response - Response status code: ${response.status}`);

        dispatch(isNotLoading());
      }
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'verifyUserInApplication',
        `Request result in an ${error}`);

      treatingVerifyUserInApplicationError(error);

      // Setting state loading false, to deactivate the loading spin.
      dispatch(isNotLoading());
    });
};

// Used in Async Action to Register Counselor
const registerCounselorAtNuvemCivica = (registerBody, dispatch, userData) => {
  axios.post(DEFAULT_USER_LINK_NUVEM_CIVICA, registerBody)
    .then((response) => {
      logInfo(FILE_NAME, 'registerCounselorAtNuvemCivica',
        `${JSON.stringify(response.data, null, 2)}`);

      // User registered successfully.
      authenticatingUserInRegister(userData, dispatch);
    })
    .catch((error) => {
      logWarn(FILE_NAME, 'registerCounselorAtNuvemCivica',
        `Request result in an ${error}`);

      // In this case, we get a user already registered at Nuvem Cívica,
      // but he may not be registered in our application.
      if (error.response.status === 400) {
        logWarn(FILE_NAME, 'registerCounselorAtNuvemCivica',
          `User already registered in Nuvem Civica or deactivated - Error code received in request - ${error.response.status}`);

        // Build the function that verify if the user is already register in our application
        // or just in Nuvem Civica.
        verifyUserInApplication(userData, dispatch);
      } else {
        treatingRegisterCounselorError(error);

        // Setting state loading false, to deactivate the loading spin.
        dispatch(isNotLoading());
      }
    });
};

// Async Action to Register Counselor
export const asyncRegisterCounselor = userData => (dispatch) => {
  logInfo(FILE_NAME, 'asyncRegisterCounselor',
    `userData received from asyncRegisterCounselor: ${JSON.stringify(userData, null, 2)}`);

  // Creating body to send in post method.
  const registerBody = {
    email: userData.email,
    nomeCompleto: userData.name,
    nomeUsuario: userData.email,
    senha: userData.password,
  };

  // Setting state loading true, to activate the loading spin.
  dispatch(isLoading());

  // Request to register a counselor at Nuvem Cívica, but not in application yet.
  registerCounselorAtNuvemCivica(registerBody, dispatch, userData);
};
// Async Action to Edit Couselor Data
export const asyncEditCounselor = counselorData => async (dispatch) => {
  dispatch(isLoading());
  logInfo(FILE_NAME, 'asyncEditCounselor',
    `counselor data to edit: ${JSON.stringify(counselorData, null, 2)}`);
  try {
    await editAccountData(counselorData);
    await editCounselorProfile(counselorData);
    dispatch(setCounselorEdited(counselorData));
  } catch (error) {
    throw error;
  }
  dispatch(isNotLoading());
};

// Functions focused in Counselor Login

const getCodGroup = async (counselorWithProfile) => {
  const paramsToNuvem = {
    params: {
      codAplicativo: APP_IDENTIFIER,
      descricao: counselorWithProfile.profile.CAE,
    },
  };

  try {
    const response = await axios.get(DEFAULT_GROUP_LINK_NUVEM_CIVICA, paramsToNuvem);
    const codGroup = response.data[0].codGrupo;

    let counselorWithCodGroup = counselorWithProfile;

    counselorWithCodGroup = {
      ...counselorWithCodGroup,
      profile: {
        ...counselorWithCodGroup.profile,
        codGroup,
      },
    };

    logInfo(FILE_NAME, 'getCodGroup',
      `Código do Grupo: ${JSON.stringify(counselorWithCodGroup, null, 2)}`);

    return counselorWithCodGroup;
  } catch (error) {
    throw errorGenerator(GROUP_LOGIN_ERROR, error.response.status);
  }
};

// Used in Async Action to Login Counselor
export const convertingProfileStringToJSON = (profileStringSingleQuote) => {
  // Changing ' to " in string received from Nuvem Civica.
  const profileStringDoubleQuote = profileStringSingleQuote.replace(/'/g, '"');

  // Converting profile string to profile JSON.
  const profileJSON = JSON.parse(profileStringDoubleQuote);

  return profileJSON;
};

// Used in Async Action to Login Counselor
export const getUserProfileInLogin = async (counselor) => {
  const getProfileHeader = {
    headers: {
      appIdentifier: APP_IDENTIFIER,
    },
  };

  try {
    const response = await axios.get(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselor.nuvemCode}/perfil`, getProfileHeader);

    logInfo(FILE_NAME, 'getUserProfileInLogin',
      `Profile data of user: ${counselor.nuvemCode} -> ${JSON.stringify(response.data, null, 2)}`);

    const profile = convertingProfileStringToJSON(response.data.camposAdicionais);
    const counselorWithProfile = counselor;
    counselorWithProfile.profile = profile;

    logInfo(FILE_NAME, 'getUserProfileInLogin',
      `Final Counselor sent to store after login: ${JSON.stringify(counselorWithProfile, null, 2)}`);

    return counselorWithProfile;
  } catch (error) {
    logWarn(FILE_NAME, 'gettingUserProfileInLogin',
      `Request result in an ${error}`);

    throw errorGenerator(PROFILE_LOGIN_ERROR, error.response.status);
  }
};

// Used in Async Action to Login Counselor
export const authenticatingCounselorInLogin = async (authenticationHeader) => {
  try {
    const response = await axios.get(AUTHENTICATE_LINK_NUVEM_CIVICA, authenticationHeader);

    logInfo(FILE_NAME, 'authenticatingCounselorInLogin',
      `User authenticated successfully, his token received from Nuvem Cívica is: ${response.headers.apptoken}`);
    logInfo(FILE_NAME, 'authenticatingCounselorInLogin',
      `User response data received from authentication: ${JSON.stringify(response.data, null, 2)}`);
    // To catch response header data you need to use response.headers.<Attribute-Needed>.
    const counselor = {
      nuvemCode: response.data.cod,
      email: response.data.email,
      name: response.data.nomeCompleto,
      userName: response.data.nomeUsuario,
      password: authenticationHeader.headers.senha,
      token: response.headers.apptoken,
      profile: {},
    };

    return counselor;
  } catch (error) {
    logWarn(FILE_NAME, 'authenticatingCounselorInLogin',
      `Request result in an ${error}`);
    throw errorGenerator(AUTH_LOGIN_ERROR, error.response.status);
  }
};

export const counselorActionsAuxiliary = {
  authenticatingCounselorInLogin,
  getUserProfileInLogin,
  getCodGroup,
};

export const selectTypeOfAuthenticationFailure = (errorMessage) => {
  switch (errorMessage.name) {
    case AUTH_LOGIN_ERROR:
      logWarn(FILE_NAME, 'asyncLoginCounselor', 'AuthError');
      treatingAuthenticatingCounselorInLoginError(errorMessage.status);
      break;
    case PROFILE_LOGIN_ERROR:
      logWarn(FILE_NAME, 'asyncLoginCounselor', 'ProfileError');
      getUserProfileInLoginErrorHandler(errorMessage.status);
      break;
    case GROUP_LOGIN_ERROR:
      logWarn(FILE_NAME, 'asyncLoginCounselor', 'GroupError');
      break;
    default:
      break;
  }
};

// Async Action to Login
export const asyncLoginCounselor = userData => async (dispatch) => {
  logInfo(FILE_NAME, 'asyncLoginCounselor',
    `userData received from LoginScreen: ${JSON.stringify(userData, null, 2)}`);

  // Header json to send Login data. OBS: The word "headers" must be written like this.
  const authenticationHeader = {
    headers: {
      appIdentifier: APP_IDENTIFIER,
      email: userData.email,
      senha: userData.password,
    },
  };

  // Setting state loading true, to activate the loading spin.
  dispatch(isLoading());

  try {
    const counselorAuthenticated = await counselorActionsAuxiliary.authenticatingCounselorInLogin(authenticationHeader);

    const counselorWithProfile = await counselorActionsAuxiliary.getUserProfileInLogin(counselorAuthenticated);

    const counselorWithCodGroup = await counselorActionsAuxiliary.getCodGroup(counselorWithProfile);

    dispatch(setCounselor(counselorWithCodGroup));

    ShowToast.Toast(LOGIN_SUCCEED);

    dispatch(isNotLoading());

    Actions.mainScreen();
  } catch (error) {
    const errorJson = JSON.parse(error.message);
    logWarn(FILE_NAME, 'asyncLoginCounselor', `${JSON.stringify(errorJson)}`);

    selectTypeOfAuthenticationFailure(errorJson);

    dispatch(isNotLoading());
  }
};

export default asyncLoginCounselor;
