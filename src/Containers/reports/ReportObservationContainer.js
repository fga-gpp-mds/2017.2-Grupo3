import { connect } from 'react-redux';
import ReportObservationScreen from '../../screens/reports/ReportObservationScreen';
import { setReportObservation, setStatusReportObservation } from '../../actions/reportActions';

const mapStateToProps = state => ({
  observation: state.report.otherObservation,
});

const mapDispatchToProps = dispatch => ({
  setReportObservation: observation => dispatch(setReportObservation(observation)),
  setStatusReportObservation: statusReportObservation => dispatch(setStatusReportObservation(statusReportObservation)),
});

const ReportObservationContainer = connect(mapStateToProps, mapDispatchToProps)(ReportObservationScreen);
export default ReportObservationContainer;
