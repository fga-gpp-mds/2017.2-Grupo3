import { connect } from 'react-redux';
import ManageNotAcceptedRegistersScreen from '../../screens/manageCounselors/ManageNotAcceptedRegistersScreen';
import { asyncGetCounselorFromGroup } from '../../actions/listActions';
import { disableCounselor, asyncAcceptCounselor } from '../../actions/ManagerRegisterActions';

const mapStateToProps = state => (
  {
    listOfNotCheckedCounselors: state.list.listOfNotCheckedCounselors,
    counselor: state.counselor,
    application: state.application.isLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    asyncGetCounselorFromGroup: (CAE, CPF) => dispatch(asyncGetCounselorFromGroup(CAE, CPF)),
    disableCounselor: (counselor, codGroup) => dispatch(disableCounselor(counselor, codGroup)),
    asyncAcceptCounselor: userData => dispatch(asyncAcceptCounselor(userData)),
  }
);

const ManageNotAcceptedRegistersScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ManageNotAcceptedRegistersScreen);

export default ManageNotAcceptedRegistersScreenContainer;
