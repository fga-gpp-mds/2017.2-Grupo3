import { connect } from 'react-redux';
import StockFoodCheckoutScreen from '../../screens/reports/StockFoodCheckoutScreen';
import {
  setStockFoodReportPositive,
  setStockFoodReportNegative,
  setFoodStockObservation,
  setStatusFoodStock,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.foodStock,
  observation: state.report.foodStockObservation,
});

const mapDispatchToProps = dispatch => ({
  setStockFoodReportPositive: key => dispatch(setStockFoodReportPositive(key)),
  setStockFoodReportNegative: key => dispatch(setStockFoodReportNegative(key)),
  setFoodStockObservation: observation => dispatch(setFoodStockObservation(observation)),
  setStatusFoodStock: statusFoodStock => dispatch(setStatusFoodStock(statusFoodStock)),
});

const StockFoodCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(StockFoodCheckoutScreen);

export default StockFoodCheckoutContainer;
