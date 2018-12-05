import { connect } from 'react-redux';
import StartPendingInspection from '../../screens/startInspection/StartPendingInspection';
import { resetStore } from '../../actions/applicationActions';
import { asyncGetCounselorFromGroup } from '../../actions/listActions';
import {
  asyncGetSchedule,
  setCurrentInspection,
} from '../../actions/schedulingVisitActions';

const mapStateToProps = state => (
  {
    isLoading: state.application.isLoading,
    counselor: state.counselor,
    listOfPendingScheduleInAGroup: state.list.listOfPendingScheduleInAGroup,
    listOfCounselorsInAGroup: state.list.listOfCounselorsInAGroup,
  }
);

const mapDispatchToProps = dispatch => ({
  asyncGetSchedule: counselor => dispatch(asyncGetSchedule(counselor)),
  asyncGetCounselorFromGroup: (CAE, CPF) => dispatch(asyncGetCounselorFromGroup(CAE, CPF)),
  setCurrentInspection: visitSchedule => dispatch(setCurrentInspection(visitSchedule)),
  resetStore: (...states) => dispatch(resetStore(...states)),
});

const StartPendingInspectionContainer = connect(mapStateToProps,
  mapDispatchToProps)(StartPendingInspection);

export default StartPendingInspectionContainer;
