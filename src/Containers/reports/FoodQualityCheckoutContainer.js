import { connect } from 'react-redux';
import FoodQualityCheckoutScreen from '../../screens/reports/FoodQualityCheckoutScreen';
import {
  setFoodQualityReportPositive,
  setFoodQualityReportNegative,
  setAcceptedMenu,
  setRefusedMenu,
  setFoodQualityObservation,
  setStatusFoodQuality,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.foodQuality,
  observation: state.report.foodQualityObservation,
  acceptedMenu: state.report.acceptedMenu,
  refusedMenu: state.report.refusedMenu,
});

const mapDispatchToProps = dispatch => ({
  setFoodQualityReportPositive: key => dispatch(setFoodQualityReportPositive(key)),
  setFoodQualityReportNegative: key => dispatch(setFoodQualityReportNegative(key)),
  setFoodQualityObservation: observation => dispatch(setFoodQualityObservation(observation)),
  setAcceptedMenu: acceptedMenu => dispatch(setAcceptedMenu(acceptedMenu)),
  setRefusedMenu: refusedMenu => dispatch(setRefusedMenu(refusedMenu)),
  setStatusFoodQuality: statusFoodQuality => dispatch(setStatusFoodQuality(statusFoodQuality)),
});

const FoodQualityCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(FoodQualityCheckoutScreen);

export default FoodQualityCheckoutContainer;
