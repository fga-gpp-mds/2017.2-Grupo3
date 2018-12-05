import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { FlatList } from 'react-native';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import SearchSchoolContainer from '../../src/Containers/SearchSchoolContainer';
import SearchSchool from '../../src/screens/SearchSchool';
import { SCHOOL_ENDPOINT } from '../../src/constants/linkConstants';

const middlewares = [thunk];

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore(middlewares);

const initialState = {
  application: {
    isLoading: false,
    message_erro: '',
  },
  school: {
    uf: 'MG - Minas Gerais',
    city: 'Ouro Preto',
    name: 'Benedito Xavier',
  },
  counselor: {
    profile: {
      CAE_municipalDistrict: 'Municipal',
      CAE_UF: 'RO',
    },
  },
  setUf: () => ({}),
  setCity: () => ({}),
};

const state = {
  name: 'BOM JESUS',
  city: 'Porto Velho',
  uf: 'RO',
};

const store = mockStore(initialState);

describe('Testing SearchSchool', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(
      <SearchSchoolContainer />,
      { context: { store } },
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Testing SearchSchool Input', () => {
  const wrapper = shallow(<SearchSchool {...initialState} />);

  it('should change state when the uf changes', () => {
    const ufInputComponent = wrapper.find('Picker').at(0);
    ufInputComponent.simulate('valueChange', 'DF - Distrito Federal');
    expect(wrapper.state().uf).toEqual('DF - Distrito Federal');
  });

  it('should change state when the text of city input component changes', () => {
    wrapper.setState({ uf: initialState.school.uf });
    const cityInputComponent = wrapper.find('Picker').at(1);
    cityInputComponent.simulate('valueChange', 'Ouro Preto');
    expect(wrapper.state().city).toEqual('Ouro Preto');
  });

  it('should change state when the text of name input component changes', () => {
    const nameInputComponent = wrapper.find('TextInput').at(0);
    nameInputComponent.simulate('ChangeText', 'Ouro Preto');
    expect(wrapper.state('name')).toEqual('Ouro Preto');
  });
});

describe('Testing SearchSchool button', () => {
  it('Test if SearchSchool Button is rendered', () => {
    const wrapper = shallow(<SearchSchool {...initialState} />);
    const button = wrapper.findWhere(c => c.key() === 'renderButton');
    expect(button.length).toEqual(1);
    button.simulate('press');
  });

  it('Test if Searchbutton works when the fields are correct', () => {
    const wrapper = shallow(<SearchSchoolContainer />, { context: { store } }).dive();
    wrapper.setState({ name: 'Alvarães', uf: 'AM' });
    const button = wrapper.findWhere(c => c.key() === 'activatedButton');

    button.simulate('press');
    expect(button.length).toEqual(1);
  });
});

describe('Testing SearchSchool register method', () => {
  it('Test if validation is called', () => {
    const wrapper = shallow(<SearchSchool {...initialState} />);
    const spy = jest.spyOn(SearchSchool.prototype, 'register');

    wrapper.setState({ name: '#' });
    wrapper.instance().register();

    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('Test if validation for empty fields is called', () => {
    const wrapper = shallow(<SearchSchool {...initialState} />);
    const spy = jest.spyOn(SearchSchool.prototype, 'register');

    wrapper.setState({ name: '' });
    wrapper.instance().register();

    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('Test if validation for correct fields is called', () => {
    const wrapper = shallow(<SearchSchool {...initialState} />);
    const spy = jest.spyOn(SearchSchool.prototype, 'register');

    wrapper.setState({ city: 'Porto Velho' });
    wrapper.instance().register();

    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('Test searchSchool method', async () => {
    const mock = new MockAdapter(axios);

    mock.onGet(SCHOOL_ENDPOINT, {
      params: {
        nome: state.name,
        municipio: state.city,
        campos: 'nome',
        uf: state.uf,
      },
    }).reply(200, [{ nome: 'BOM JESUS' }]);

    const wrapper = shallow(<SearchSchoolContainer />, { context: { store } }).dive();
    wrapper.setState(state);

    await wrapper.instance().searchSchools();

    // Without this timeout, the wrapper doesn't update the state for some reason.
    expect(wrapper.state('schoolList')).toEqual([{ nome: 'BOM JESUS' }]);
  });

  it('Test validateCity method', () => {
    const spy = jest.spyOn(SearchSchool.prototype, 'validateCity');
    const wrapper = shallow(<SearchSchoolContainer />, { context: { store } }).dive();
    wrapper.instance().validateCity(initialState.school.city);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('Testing school list rendering', () => {
    const wrapper = shallow(<SearchSchoolContainer />, { context: { store } }).dive();
    wrapper.instance().setState({ schoolList: [{ nome: 'Nome', codEscola: 1 }] });
    expect(wrapper).toMatchSnapshot();
  });

  it('Testing school list button', () => {
    const wrapper = shallow(<SearchSchoolContainer />, { context: { store } }).dive();
    wrapper.setState({ schoolList: [{ nome: 'Nome', codEscola: 1 }] });
    wrapper.setProps({ setSchoolInfo: () => true });
    const component = wrapper.findWhere(c => c.key() === 'schoolListView');
    const item = {
      item: {
        nome: 'Nome',
        codEscola: 1,
      },
    };

    const schoolItem = component.find(FlatList).props().renderItem(item);
    const onPressResult = schoolItem.props.onPress();
    expect(onPressResult).toBeTruthy();
  });
});
