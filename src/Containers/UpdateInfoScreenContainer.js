import { connect } from 'react-redux';
import UpdateInfoScreen from '../screens/UpdateInfoScreen';

const mapStateToProps = (state) => {
  console.log(state);
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoScreen);
