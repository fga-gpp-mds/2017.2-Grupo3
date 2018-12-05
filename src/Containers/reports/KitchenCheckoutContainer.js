import { connect } from 'react-redux';
import KitchenCheckoutScreen from '../../screens/reports/KitchenCheckoutScreen';
import {
  setKitchenReportPositive,
  setKitchenReportNegative,
  setKitchenObservation,
  setStatusKitchen,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.kitchen,
  observation: state.report.kitchenObservation,
});

const mapDispatchToProps = dispatch => ({
  setKitchenReportPositive: key => dispatch(setKitchenReportPositive(key)),
  setKitchenReportNegative: key => dispatch(setKitchenReportNegative(key)),
  setKitchenObservation: observation => dispatch(setKitchenObservation(observation)),
  setStatusKitchen: statusKitchen => dispatch(setStatusKitchen(statusKitchen)),
});

const kitchenCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(KitchenCheckoutScreen);

export default kitchenCheckoutContainer;
