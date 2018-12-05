import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logInfo } from '../../logConfig/loggers';
import {
  isLoading,
  isNotLoading,
  convertingContentStringToJSON,
  convertingJSONToString,
} from './applicationActions';
import {
  SET_CURRENT_INSPECTION,
} from './types';
import {
  POSTS_LINK_NUVEM_CIVICA,
} from '../constants/linkConstants';
import {
  APP_IDENTIFIER,
  VISIT_POSTING_TYPE_CODE,
} from '../constants/codeNumbers';
import {
  setPendingScheduleList,
  setExpiredScheduleList,
  setAlreadyInspectionedScheduleList,
  resetList,
  setPendingInvitedScheduleList,
} from './listActions';
import {
  GET_VISIT_SCHEDULE_CONTENT_ERROR,
  GET_VISIT_SCHEDULE_POST_LIST_ERROR,
} from '../constants/errorConstants';
import { authenticatingMasterCounselor } from './ManagerRegisterActions';
import sendEmailAlert from './sendEmailActions';
import treatingError from './errorUtils';

const FILE_NAME = 'schedulingVisitActions.js';

export const errorGenerator = (name, status) => new Error(`{ "name": "${name}", "status": ${JSON.stringify(status)} }`);

export const setCurrentInspection = visitSchedule => ({
  type: SET_CURRENT_INSPECTION,
  payload: visitSchedule,
});


// Verify the date of the visit schedule to set expired or not.
const verifyDate = (visitSchedule) => {
  const date = new Date();
  const systemDay = date.getDate();
  const systemMonth = date.getMonth() + 1;
  const systemYear = date.getFullYear();

  const daySchedule = visitSchedule.content.date.substr(0, 2);
  const monthSchedule = visitSchedule.content.date.substr(3, 2);
  const yearSchedule = visitSchedule.content.date.substr(6);

  if (yearSchedule < systemYear) {
    return true;
  } if (yearSchedule > systemYear) {
    return false;
  }
  if (monthSchedule < systemMonth) {
    return true;
  } if (monthSchedule > systemMonth) {
    return false;
  }
  if (daySchedule < systemDay) {
    return true;
  }
  return false;
};


// Put each visit schedule in its respective list (pending, expired or inspected).
const defineScheduleStatus = (visitSchedule, counselor, dispatch) => {
  if (visitSchedule.content.visitListOfInvitees[counselor.nuvemCode] !== undefined) {
    if (visitSchedule.content.visitListOfInvitees[counselor.nuvemCode].realizedVisit) {
      dispatch(setAlreadyInspectionedScheduleList(visitSchedule));
    } else if (verifyDate(visitSchedule)) {
      dispatch(setExpiredScheduleList(visitSchedule));
    } else {
      dispatch(setPendingScheduleList(visitSchedule));
      dispatch(setPendingInvitedScheduleList(visitSchedule));
    }
  } else if (visitSchedule.content.visitListOfInvitees[counselor.nuvemCode] === undefined) {
    if (verifyDate(visitSchedule)) {
      dispatch(setExpiredScheduleList(visitSchedule));
    } else {
      dispatch(setPendingScheduleList(visitSchedule));
    }
  }
};


// Used in Async Action to Get All Post Visit Schedules
export const getVisitScheduleContent = async (contentLink, counselor, dispatch) => {
  logInfo(FILE_NAME, 'getVisitScheduleContent', `${counselor}`);
  const getContentHeader = {
    headers: {
      appToken: counselor.token,
    },
  };

  try {
    const response = await axios.get(contentLink, getContentHeader);

    logInfo(FILE_NAME, 'getVisitScheduleContent',
      `Content of one visit schedule post: ${JSON.stringify(response.data, null, 2)}`);

    const visitSchedule = {
      codPostagem: response.data.postagem.codPostagem,
      codConteudoPost: response.data.codConteudoPost,
      content: convertingContentStringToJSON(response.data.JSON),
    };

    defineScheduleStatus(visitSchedule, counselor, dispatch);

    return visitSchedule;
  } catch (error) {
    treatingError(error);
    throw errorGenerator(GET_VISIT_SCHEDULE_CONTENT_ERROR, error.response.status);
  }
};


// Used in Async Action to Get All Post Visit Schedules
export const getVisitSchedulePostList = async (getScheduleParamsAndHeader) => {
  try {
    const response = await axios.get(POSTS_LINK_NUVEM_CIVICA, getScheduleParamsAndHeader);

    logInfo(FILE_NAME, 'getVisitSchedulePostList',
      `List of Schedules without content: ${JSON.stringify(response.data, null, 2)}`);

    return response;
  } catch (error) {
    treatingError(error);
    throw errorGenerator(GET_VISIT_SCHEDULE_CONTENT_ERROR, error.response.status);
  }
};


export const visitScheduleActionsAuxiliary = {
  getVisitSchedulePostList,
  getVisitScheduleContent,
};


// Assync action to get all post visit schedules
export const asyncGetSchedule = counselor => async (dispatch) => {
  // Setting state loading true, to activate the loading spin.
  dispatch(isLoading());

  dispatch(resetList());

  // Params to get all scheduling posts of current counselor group.
  const getScheduleParamsAndHeader = {
    params: {
      codGrupoDestino: counselor.profile.codGroup,
      codTiposPostagem: VISIT_POSTING_TYPE_CODE,
    },
    headers: {
      appToken: counselor.token,
    },
  };

  try {
    const visitSchedulePostList = await visitScheduleActionsAuxiliary.getVisitSchedulePostList(getScheduleParamsAndHeader);

    const visitScheduleContentList = [];
    // Get the content for each visit schedule post in list and organize then.
    for (let i = 0; i < visitSchedulePostList.data.length; i += 1) {
      visitScheduleContentList.push(
        visitScheduleActionsAuxiliary.getVisitScheduleContent(
          visitSchedulePostList.data[i].conteudos[0].links[0].href,
          counselor,
          dispatch,
        ),
      );
    }


    // Wait all visit schedules are put on their respective lists.
    await Promise.all(visitScheduleContentList);
  } catch (error) {
    logInfo(FILE_NAME, 'asyncGetSchedule',
      `Error while getting schedules: ${error}`);
    const errorJson = JSON.parse(error.message);
    switch (errorJson.name) {
      case GET_VISIT_SCHEDULE_CONTENT_ERROR:
        treatingError(error);
        break;
      case GET_VISIT_SCHEDULE_POST_LIST_ERROR:
        treatingError(error);
        break;
      default:
        dispatch(isNotLoading());
        break;
    }
  }

  dispatch(isNotLoading());
  Actions.refresh();
};

const schedulingVisit = (visitData, counselor) => {
  const headerToSchedulingVisit = {
    headers: {
      appIdentifier: APP_IDENTIFIER,
      appToken: visitData.appToken,
    },
  };

  // Adding the author of the schedule to the list of invitees
  const authorsNuvemCode = visitData.nuvemCode;
  const visitDataWithAuthor = visitData.visit;

  visitDataWithAuthor.visitListOfInvitees[authorsNuvemCode] = {
    nuvemCode: authorsNuvemCode,
    confirmed: true,
    realizedVisit: false,
  };

  const stringVisit = convertingJSONToString(visitData.visit);

  const bodyToSchedulingVisit = {
    conteudo: {
      JSON: stringVisit,
      texto: 'Agendamento',
    },
    postagem: {
      autor: {
        codPessoa: visitData.nuvemCode,
      },
      tipo: {
        codTipoPostagem: VISIT_POSTING_TYPE_CODE,
      },
      codGrupoDestino: visitData.codGrupoDestino,
    },
  };

  axios.post(`${POSTS_LINK_NUVEM_CIVICA}/conteudos`, bodyToSchedulingVisit, headerToSchedulingVisit)
    .then((response) => {
      logInfo(FILE_NAME, 'schedulingVisit',
        `Scheduling made in Nuvem cívica: ${JSON.stringify(response.data, null, 2)}`);
      if (visitData.visit.invitedAgent) {
        sendEmailAlert(visitData, counselor);
      }
      Alert.alert(
        'Agendamento Realizado',
        'O agendamento foi realizado com sucesso! Caso tenha convidado um agente, seu aplicativo de email abrirá.',
        [
          { text: 'Ok', onPress: () => Actions.mainScreen(), style: 'cancel' },
        ],
        { cancelable: false },
      );
    })
    .catch((error) => {
      treatingError(error);
    });
};

export const asyncSchedulingVisit = (visitData, counselor) => () => {
  logInfo(FILE_NAME, 'asyncSchedulingVisit',
    `Scheduling visit data: ${JSON.stringify(visitData, null, 2)}`);
  logInfo(FILE_NAME, 'asyncSchedulingVisit',
    `Scheduling counselor data: ${JSON.stringify(counselor, null, 2)}`);

  schedulingVisit(visitData, counselor);
};

export const asyncUpdateSchedule = postData => async (dispatch) => {
  logInfo(FILE_NAME, 'asyncUpdateSchedule',
    `Scheduling visit data: ${JSON.stringify(postData, null, 2)}`);

  dispatch(isLoading());

  const newContentJSON = postData.content;

  const newContentString = convertingJSONToString(newContentJSON);

  const MASTER_TOKEN = await authenticatingMasterCounselor();

  // Change this token to the master token.
  const putScheduleHeader = {
    headers: {
      appToken: MASTER_TOKEN,
    },
  };

  const putScheduleBody = {
    JSON: newContentString,
    texto: 'Agendamento',
  };

  logInfo(FILE_NAME, 'asyncUpdateSchedule', `JSON sent to update schedule ${JSON.stringify(putScheduleBody)}`);

  try {
    const response = await axios.put(
      `${POSTS_LINK_NUVEM_CIVICA}/${postData.codPostagem}/conteudos/${postData.codConteudoPost}`,
      putScheduleBody,
      putScheduleHeader,
    );
    logInfo(FILE_NAME, 'asyncUpdateSchedule', response.data);
  } catch (error) {
    treatingError(error);
  }

  dispatch(isNotLoading());
};


export const asyncGetCurrentSchedule = getData => async (dispatch) => {
  logInfo(FILE_NAME, 'asyncGetCurrentSchedule', `Received data: ${JSON.stringify(getData)}`);

  const header = {
    headers: {
      appToken: getData.appToken,
    },
  };

  const codPostagem = getData.codPostagem;
  const codConteudoPost = getData.codConteudoPost;

  try {
    const response = await axios.get(`${POSTS_LINK_NUVEM_CIVICA}/${codPostagem}/conteudos/${codConteudoPost}`, header);

    logInfo(FILE_NAME, 'asyncGetCurrentSchedule', `Response data: ${JSON.stringify(response.data)}`);

    const currentInspection = {
      codPostagem: response.data.postagem.codPostagem,
      codConteudoPost: response.data.codConteudoPost,
      content: convertingContentStringToJSON(response.data.JSON),
    };

    logInfo(FILE_NAME, 'asyncGetCurrentSchedule', `Current inspection ${JSON.stringify(currentInspection)}`);

    dispatch(setCurrentInspection(currentInspection));
  } catch (error) {
    treatingError(error);
  }
};

export default asyncSchedulingVisit;
