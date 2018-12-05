import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logInfo, logWarn } from '../../logConfig/loggers';
import {
  isLoading,
  isNotLoading,
  convertingJSONToString,
  convertingContentStringToJSON,
} from './applicationActions';
import {
  POSTS_LINK_NUVEM_CIVICA,
} from '../constants/linkConstants';
import {
  APP_IDENTIFIER,
  MEETING_POSTING_TYPE_CODE,
} from '../constants/codeNumbers';
import { SET_MEETING_LOCATION_LONGITUDE, SET_MEETING_LOCATION_LATITUDE } from './types';
import { resetList, setScheduleMeetingList } from './listActions';
import GetMeetingPostListError from '../customExceptions/meetingPostListError';
import GetMeetingContentError from '../customExceptions/meetingContentError';
import { dateNotExpired } from './auxiliary/schedulingMeeting/schedulingMeetingAuxiliary';
import {
  treatingPostsError,
  treatingGetMeetingScheduleContentError,
  treatingGetMeetingSchedulePostListError,
} from './auxiliary/schedulingMeeting/schedulingMeetingErrors';

export const FILE_NAME = 'schedulingMeetingActions.js';

const defineMeetingStatus = (meetingSchedule, counselor, dispatch) => {
  logInfo(FILE_NAME, 'defineMeetingStatus', `${JSON.stringify(meetingSchedule)}`);

  const counselorInvited = meetingSchedule.content.meetingListOfInvitees[counselor.nuvemCode] !== undefined;
  const validMeeting = !dateNotExpired(meetingSchedule);

  if (counselorInvited && validMeeting) {
    dispatch(setScheduleMeetingList(meetingSchedule));
  }
};

// Used in Async Action to Get All Post Meeting Schedules
export const getMeetingContent = async (contentLink, counselor, dispatch) => {
  const getContentHeader = {
    headers: {
      appToken: counselor.token,
    },
  };

  try {
    const response = await axios.get(contentLink, getContentHeader);

    logInfo(FILE_NAME, 'getMeetingContent',
      `Content of one meeting post: ${JSON.stringify(response.data, null, 2)}`);

    const meetingSchedule = {
      codPostagem: response.data.postagem.codPostagem,
      codConteudoPost: response.data.codConteudoPost,
      content: convertingContentStringToJSON(response.data.JSON),
    };

    defineMeetingStatus(meetingSchedule, counselor, dispatch);
  } catch (error) {
    logWarn(FILE_NAME, 'getMeetingContent',
      `Request result in an ${error.stack}`);

    throw new GetMeetingContentError(error.response);
  }
};

// Used in Async Action to Get All Post Meeting Schedules
export const getMeetingPostList = async (getMeetingParamsAndHeader) => {
  try {
    const response = await axios.get(POSTS_LINK_NUVEM_CIVICA, getMeetingParamsAndHeader);

    logInfo(FILE_NAME, 'getMeetingSchedulePostList',
      `List of Meeting without content: ${JSON.stringify(response.data, null, 2)}`);

    return response;
  } catch (error) {
    logWarn(FILE_NAME, 'getMeetingPostList',
      `Request result in an ${error}`);

    throw new GetMeetingPostListError(error.response);
  }
};

export const meetingScheduleActionsAuxiliary = {
  getMeetingPostList,
  getMeetingContent,
  defineMeetingStatus,
};

// Assync action to get all post Meeting schedules
export const asyncGetScheduleMeeting = counselor => async (dispatch) => {
  // Setting state loading true, to activate the loading spin.
  dispatch(isLoading());

  dispatch(resetList());

  // Params to get all scheduling posts of current counselor group.
  const getScheduleMeetingParamsAndHeader = {
    params: {
      codGrupoDestino: counselor.profile.codGroup,
      codTiposPostagem: MEETING_POSTING_TYPE_CODE,
    },
    headers: {
      appToken: counselor.token,
    },
  };

  try {
    const meetingSchedulePostList = await meetingScheduleActionsAuxiliary.getMeetingPostList(
      getScheduleMeetingParamsAndHeader,
    );

    const meetingScheduleContentList = [];
    // Get the content for each meeting schedule post in list and organize then.
    for (let i = 0; i < meetingSchedulePostList.data.length; i += 1) {
      meetingScheduleContentList.push(
        meetingScheduleActionsAuxiliary.getMeetingContent(
          meetingSchedulePostList.data[i].conteudos[0].links[0].href,
          counselor,
          dispatch,
        ),
      );
    }

    // Wait all meeting schedules are put on their respective lists.
    await Promise.all(meetingScheduleContentList);

    dispatch(isNotLoading());
  } catch (error) {
    if (error instanceof GetMeetingPostListError) {
      treatingGetMeetingSchedulePostListError(error);
    } else if (error instanceof GetMeetingContentError) {
      treatingGetMeetingScheduleContentError(error);
    }

    dispatch(isNotLoading());
  }
};

export const schedulingMeeting = (meetingData, dispatch) => {
  const headerToSchedulingMeeting = {
    headers: {
      appIdentifier: APP_IDENTIFIER,
      appToken: meetingData.appToken,
    },
  };

  // Adding the author of the schedule to the list of invitees
  const authorsNuvemCode = meetingData.nuvemCode;
  const meetingDataWithAuthor = meetingData.meeting;

  meetingDataWithAuthor.meetingListOfInvitees[authorsNuvemCode] = {
    nuvemCode: authorsNuvemCode,
    confirmed: true,
  };

  const stringMeeting = convertingJSONToString(meetingData.meeting);
  const bodyToSchedulingMeeting = {
    conteudo: {
      JSON: stringMeeting,
      texto: 'Agendamento de reunião',
    },
    postagem: {
      autor: {
        codPessoa: meetingData.nuvemCode,
      },
      tipo: {
        codTipoPostagem: MEETING_POSTING_TYPE_CODE,
      },
      codGrupoDestino: meetingData.codGrupoDestino,
    },
  };

  axios.post(`${POSTS_LINK_NUVEM_CIVICA}/conteudos`, bodyToSchedulingMeeting, headerToSchedulingMeeting)
    .then((response) => {
      logInfo(FILE_NAME, 'schedulingMeeting',
        `Scheduling made in Nuvem cívica: ${JSON.stringify(response.data, null, 2)}`);
      Alert.alert('Agendamento realizado com sucesso');
      dispatch(isNotLoading());
      Actions.mainScreen();
    })
    .catch((response, error) => {
      logWarn(FILE_NAME, 'schedulingMeeting',
        `Request result in an ${error}`);

      treatingPostsError(error);

      dispatch(isNotLoading());
    });
};

const asyncSchedulingMeeting = meetingData => (dispatch) => {
  logInfo(FILE_NAME, 'asyncSchedulingMeeting',
    `Scheduling meeting data: ${JSON.stringify(meetingData, null, 2)}`);

  dispatch(isLoading());

  schedulingMeeting(meetingData, dispatch);
};

export default asyncSchedulingMeeting;

export const setMeetingLocationLatitude = latitude => ({
  type: SET_MEETING_LOCATION_LATITUDE,
  payload: {
    latitude,
  },
});

export const setMeetingLocationLongitude = longitude => ({
  type: SET_MEETING_LOCATION_LONGITUDE,
  payload: {
    longitude,
  },
});
