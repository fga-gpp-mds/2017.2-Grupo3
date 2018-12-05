import { connect } from 'react-redux';
import SchoolSurroundingsCheckoutScreen from '../../screens/reports/SchoolSurroundingsCheckoutScreen';
import {
  setSchoolSurroundingsReportPositive,
  setSchoolSurroundingsReportNegative,
  setSchoolSurroundingsObservation,
  setStatusSchoolSurroundings,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.schoolSurroundings,
  observation: state.report.schoolSurroundingsObservation,
});

const mapDispatchToProps = dispatch => ({
  setSchoolSurroundingsReportPositive: key => dispatch(setSchoolSurroundingsReportPositive(key)),
  setSchoolSurroundingsReportNegative: key => dispatch(setSchoolSurroundingsReportNegative(key)),
  setSchoolSurroundingsObservation: observation => dispatch(setSchoolSurroundingsObservation(observation)),
  setStatusSchoolSurroundings: statusSchoolSurroundings => dispatch(setStatusSchoolSurroundings(statusSchoolSurroundings)),
});

const SchoolSurroundingsCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(SchoolSurroundingsCheckoutScreen);
export default SchoolSurroundingsCheckoutContainer;
