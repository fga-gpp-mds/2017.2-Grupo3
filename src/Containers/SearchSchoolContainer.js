import { connect } from 'react-redux';
import SearchSchool from '../screens/SearchSchool';
import { asyncChangeToSchoolInfoScreen, setUf, setCity } from '../actions/schoolActions';

const mapStateToProps = state => ({
  counselor: state.counselor,
  school: state.school,
});

const mapDispatchToProps = dispatch => ({
  setSchoolInfo: selectedSchoolCode => dispatch(asyncChangeToSchoolInfoScreen({ schoolCode: selectedSchoolCode })),
  setUf: uf => dispatch(setUf(uf)),
  setCity: city => dispatch(setCity(city)),
});

const SearchSchoolContainer = connect(mapStateToProps, mapDispatchToProps)(SearchSchool);

export default SearchSchoolContainer;
