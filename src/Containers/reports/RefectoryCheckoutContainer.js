import { connect } from 'react-redux';
import RefectoryCheckoutScreen from '../../screens/reports/RefectoryCheckoutScreen';
import {
  setRefectoryReportPositive,
  setRefectoryReportNegative,
  setRefectoryObservation,
  setStatusRefectory,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.refectory,
  observation: state.report.refectoryObservation,
});

const mapDispatchToProps = dispatch => ({
  setRefectoryReportPositive: key => dispatch(setRefectoryReportPositive(key)),
  setRefectoryReportNegative: key => dispatch(setRefectoryReportNegative(key)),
  setRefectoryObservation: observation => dispatch(setRefectoryObservation(observation)),
  setStatusRefectory: statusRefectory => dispatch(setStatusRefectory(statusRefectory)),
});

const RefectoryCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(RefectoryCheckoutScreen);

export default RefectoryCheckoutContainer;
