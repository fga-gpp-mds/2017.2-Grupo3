import {
  SET_LIST_COUNSELOR_GROUP,
  RESET_LIST,
  SET_PENDING_SCHEDULE_LIST,
  SET_EXPIRED_SCHEDULE_LIST,
  SET_ALREADY_INPECTIONED_SCHEDULE_LIST,
  SET_VISIT_NEW_LISTS,
  SET_MEETING_NEW_LISTS,
  SET_SCHEDULE_MEETING_LIST,
  SET_CHECKED_LIST,
  SET_NOT_CHECKED_LIST,
  SET_PENDING_INVITED_SCHEDULE_LIST,
} from './types';
import {
  getGroup,
  getCounselorFromGroup,
  getCounselor,
  getCounselorProfile,
} from './auxiliary/getCounselorFromGroupAuxiliary';
import { logInfo } from '../../logConfig/loggers';
import { isLoading, isNotLoading } from './applicationActions';

const FILE_NAME = 'listActions.js';

export const setPendingInvitedScheduleList = visitScheduleList => ({
  type: SET_PENDING_INVITED_SCHEDULE_LIST,
  payload: visitScheduleList,
});

export const setPendingScheduleList = visitScheduleList => ({
  type: SET_PENDING_SCHEDULE_LIST,
  payload: visitScheduleList,
});


export const setExpiredScheduleList = visitScheduleList => ({
  type: SET_EXPIRED_SCHEDULE_LIST,
  payload: visitScheduleList,
});

export const setScheduleMeetingList = scheduleMeetingList => ({
  type: SET_SCHEDULE_MEETING_LIST,
  payload: scheduleMeetingList,
});

export const setAlreadyInspectionedScheduleList = visitScheduleList => ({
  type: SET_ALREADY_INPECTIONED_SCHEDULE_LIST,
  payload: visitScheduleList,
});

export const resetList = () => ({
  type: RESET_LIST,
});

export const setList = counselorInformations => ({
  type: SET_LIST_COUNSELOR_GROUP,
  payload: counselorInformations,
});

export const setVisitNewLists = newList => ({
  type: SET_VISIT_NEW_LISTS,
  payload: newList,
});

export const setMeetingNewLists = meetingNewList => ({
  type: SET_MEETING_NEW_LISTS,
  payload: meetingNewList,
});

export const setlistOfCheckedCounselors = checkedCounselor => ({
  type: SET_CHECKED_LIST,
  payload: checkedCounselor,
});

export const setlistOfNotCheckedCounselors = notCheckedCounselor => ({
  type: SET_NOT_CHECKED_LIST,
  payload: notCheckedCounselor,
});

export const getCounselorData = async (counselorsInformationWithNuvemCode) => {
  const promisesCompleteCounselors = [];
  for (let i = 0; i < counselorsInformationWithNuvemCode.length; i += 1) {
    promisesCompleteCounselors.push(
      getCounselorProfile(
        counselorsInformationWithNuvemCode[i][0],
        counselorsInformationWithNuvemCode[i][1],
      ),
    );
  }
  return Promise.all(promisesCompleteCounselors);
};

export const getCounselorLinks = async (codGroup) => {
  const listOfLinks = await getCounselorFromGroup(codGroup);
  logInfo(FILE_NAME, 'asyncGetCounselorFromGroup', `ListOfLinks: ${listOfLinks}`);
  const counselorLinks = listOfLinks[0];
  logInfo(FILE_NAME, 'asyncGetCounselorFromGroup', `counselorLinks: ${counselorLinks}`);
  const linksWithCodMembro = listOfLinks[1];
  logInfo(FILE_NAME, 'asyncGetCounselorFromGroup', `LinksWithCodMembro ${linksWithCodMembro}`);

  const promisesInformationWithNuvemCode = [];

  for (let i = 0; i < listOfLinks.length; i += 1) {
    promisesInformationWithNuvemCode.push(getCounselor(counselorLinks[i],
      linksWithCodMembro[i]));
  }
  return Promise.all(promisesInformationWithNuvemCode);
};

export const selectListOfCounselor = (counselor, CPF) => async (dispatch) => {
  if (counselor.profile.cpf !== CPF) {
    dispatch(setList(counselor));
    logInfo(FILE_NAME, 'asyncGetCounselorFromGroup', `Counselors sent to store ${JSON.stringify(counselor)}`);
    if (counselor.profile.presidentChecked) {
      dispatch(setlistOfCheckedCounselors(counselor));
    } else {
      dispatch(setlistOfNotCheckedCounselors(counselor));
    }
  }
};

export const asyncGetCounselorFromGroup = (CAE, CPF) => async (dispatch) => {
  dispatch(isLoading());
  dispatch(resetList());

  const codGroup = await getGroup(CAE);
  logInfo(FILE_NAME, 'asyncGetCounselorFromGroup', `Received codGroup: ${codGroup}`);

  // Return a array of arrays.
  // For each element, position 0 is the counselor information, and position 1 is the nuvem code.
  const counselorsInformationWithNuvemCode = await getCounselorLinks(codGroup);

  const completeCounselors = await getCounselorData(counselorsInformationWithNuvemCode);

  logInfo(FILE_NAME, 'asyncGetCounselorFromGroup', `CompleteCounselors: ${JSON.stringify(completeCounselors)}`);
  for (let i = 0; i < completeCounselors.length; i += 1) {
    dispatch(selectListOfCounselor(completeCounselors[i], CPF));
  }
  dispatch(isNotLoading());
};
