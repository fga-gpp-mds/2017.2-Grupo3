import { connect } from 'react-redux';
import FoodPreparationCheckoutScreen from '../../screens/reports/FoodPreparationCheckoutScreen';
import {
  setFoodPreparationReportPositive,
  setFoodPreparationReportNegative,
  setFoodPreparationObservation,
  setStatusFoodPreparation,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.foodPreparation,
  observation: state.report.foodPreparationObservation,
});

const mapDispatchToProps = dispatch => ({
  setFoodPreparationReportPositive: key => dispatch(setFoodPreparationReportPositive(key)),
  setFoodPreparationReportNegative: key => dispatch(setFoodPreparationReportNegative(key)),
  setFoodPreparationObservation: observation => dispatch(setFoodPreparationObservation(observation)),
  setStatusFoodPreparation: statusFoodPreparation => dispatch(setStatusFoodPreparation(statusFoodPreparation)),
});

const FoodPreparationCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(FoodPreparationCheckoutScreen);

export default FoodPreparationCheckoutContainer;
