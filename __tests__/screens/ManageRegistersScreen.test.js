import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ManageRegistersScreenContainer from '../../src/Containers/ManageRegistersScreenContainer';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  counselor: {
    token: 1,
    profile: {
      cpf: '11111111111',
      codGroup: '0',
      CAE: 'RO',
    },
  },
  list: {
    listOfCounselorsInAGroup: [{ nome: 'Joao' }],
  },
  asyncGetCounselorFromGroup: 12312321,
};

const store = mockStore(initialState);

describe('Testing ManagerRegistersScreen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <ManageRegistersScreenContainer />,
      { context: { store } },
    ).dive();
  });
});