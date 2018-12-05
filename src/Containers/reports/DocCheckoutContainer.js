import { connect } from 'react-redux';
import DocCheckoutScreen from '../../screens/reports/DocCheckoutScreen';
import {
  setDocReportPositive,
  setDocReportNegative,
  setDocObservation,
  setStatusDoc,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.doc,
  observation: state.report.docObservation,
});

const mapDispatchToProps = dispatch => ({
  setDocReportPositive: key => dispatch(setDocReportPositive(key)),
  setDocReportNegative: key => dispatch(setDocReportNegative(key)),
  setDocObservation: observation => dispatch(setDocObservation(observation)),
  setStatusDoc: statusDoc => dispatch(setStatusDoc(statusDoc)),
});

const DocCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(DocCheckoutScreen);

export default DocCheckoutContainer;
