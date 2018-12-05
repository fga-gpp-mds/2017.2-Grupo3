import { connect } from 'react-redux';
import WaterSewerSupplyCheckoutScreen from '../../screens/reports/WaterSewerSupplyCheckoutScreen';
import {
  setWaterSewerSupplyReportPositive,
  setWaterSewerSupplyReportNegative,
  setWaterSewerSupplyObservation,
  setStatusWaterSewerSupply,
} from '../../actions/reportActions';

const mapStateToProps = state => ({
  report: state.report.waterSewerSupply,
  observation: state.report.waterSewerSupplyObservation,
});

const mapDispatchToProps = dispatch => ({
  setWaterSewerSupplyReportPositive: key => dispatch(setWaterSewerSupplyReportPositive(key)),
  setWaterSewerSupplyReportNegative: key => dispatch(setWaterSewerSupplyReportNegative(key)),
  setWaterSewerSupplyObservation: observation => dispatch(setWaterSewerSupplyObservation(observation)),
  setStatusWaterSewerSupply: statusWaterSewerSupply => dispatch(setStatusWaterSewerSupply(statusWaterSewerSupply)),
});

const WaterSewerSupplyCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(WaterSewerSupplyCheckoutScreen);

export default WaterSewerSupplyCheckoutContainer;
