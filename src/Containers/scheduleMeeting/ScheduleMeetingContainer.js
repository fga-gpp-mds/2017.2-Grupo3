import { connect } from 'react-redux';
import ScheduleMeeting from '../../screens/scheduleMeeting/ScheduleMeeting';
import asyncSchedulingMeeting from '../../actions/schedulingMeetingActions';
import { asyncGetCounselorFromGroup, setMeetingNewLists } from '../../actions/listActions';

const mapStateToProps = state => ({
  isLoading: state.application.isLoading,
  listOfCounselorsInAGroup: state.list.listOfCounselorsInAGroup,
  meetingListOfInviteesWithCounselorInformations:
    state.list.meetingListOfInviteesWithCounselorInformations,
  meetingListOfInvitees: state.list.meetingListOfInvitees,
  counselor: state.counselor,
  scheduleMeeting: state.scheduleMeeting,
});

const mapDispatchToProps = dispatch => ({
  asyncGetCounselorFromGroup: (CAE, CPF) => dispatch(asyncGetCounselorFromGroup(CAE, CPF)),

  asyncSchedulingMeeting: meetingData => dispatch(asyncSchedulingMeeting(meetingData)),

  setMeetingNewLists: meetingNewListWithInformations => dispatch(setMeetingNewLists(meetingNewListWithInformations)),
});

const ScheduleMeetingContainer = connect(mapStateToProps, mapDispatchToProps)(ScheduleMeeting);

export default ScheduleMeetingContainer;
