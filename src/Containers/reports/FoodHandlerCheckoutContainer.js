import { connect } from 'react-redux';
import FoodHandlerCheckoutScreen from '../../screens/reports/FoodHandlerCheckoutScreen';
import {
  setFoodHandlerReportPositive,
  setFoodHandlerReportNegative,
  setFoodHandlerObservation,
  setStatusFoodHandler,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.foodHandler,
  observation: state.report.foodHandlerObservation,
});

const mapDispatchToProps = dispatch => ({
  setFoodHandlerReportPositive: key => dispatch(setFoodHandlerReportPositive(key)),
  setFoodHandlerReportNegative: key => dispatch(setFoodHandlerReportNegative(key)),
  setFoodHandlerObservation: observation => dispatch(setFoodHandlerObservation(observation)),
  setStatusFoodHandler: statusFoodHandler => dispatch(setStatusFoodHandler(statusFoodHandler)),
});

const FoodHandlerCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(FoodHandlerCheckoutScreen);

export default FoodHandlerCheckoutContainer;
