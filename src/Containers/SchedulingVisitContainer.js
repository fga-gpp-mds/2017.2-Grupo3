import { connect } from 'react-redux';
import SchedulingVisit from '../screens/SchedulingVisit';
import { asyncSchedulingVisit } from '../actions/schedulingVisitActions';
import {
  asyncGetCounselorFromGroup,
  setVisitNewLists,
} from '../actions/listActions';

const mapStateToProps = state => ({
  listOfCounselorsInAGroup: state.list.listOfCounselorsInAGroup,
  visitListOfInviteesWithCounselorInformations:
  state.list.visitListOfInviteesWithCounselorInformations,
  visitListOfInvitees: state.list.visitListOfInvitees,
  counselor: state.counselor,
  school: state.school,
  application: state.application.isLoading,
});

const mapDispatchToProps = dispatch => ({
  asyncGetCounselorFromGroup: async (CAE, CPF) => dispatch(await asyncGetCounselorFromGroup(CAE, CPF)),

  asyncSchedulingVisit: (visitData, counselor) => dispatch(asyncSchedulingVisit(visitData, counselor)),

  setVisitNewLists: visitNewListWithInformations => dispatch(setVisitNewLists(visitNewListWithInformations)),
});

const SchedulingVisitContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulingVisit);

export default SchedulingVisitContainer;
