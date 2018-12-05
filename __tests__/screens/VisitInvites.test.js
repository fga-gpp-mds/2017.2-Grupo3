import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import VisitInvitesContainer from '../../src/Containers/VisitInvitesContainer';
import VisitInvites from '../../src/screens/VisitInvites';
import { SCHOOL_ENDPOINT } from '../../src/constants/linkConstants';
import * as Toast from '../../src/components/Toast';

const middlewares = [thunk];

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore(middlewares);

const initialState = {
  currentSchedule: {
    codConteudoPost: 0,
    codPostagem: 10,
    content: {
      agentEmail: 'email@email.com',
      codSchool: 0,
      date: '0-0-0000',
      invitedAgent: false,
      schoolName: 'Nome da escola',
      time: '00:00',
      visitListOfInvitees: {},
    },
  },
  counselor: {
    name: 'testCounselor',
    email: 'test@test.com',
    token: 'abc',
    nuvemCode: 123,
  },
  application: {
    isLoading: false,
  },
  list: {
    listOfPendingInvitedScheduleList: [{
      codSchool: 53007654,
      schoolName: 'EC 02 DE CEILANDIA',
      date: '30-12-2017',
      time: '20:36',
      invitedAgent: false,
      agentEmail: '',
      visitListOfInvitees: {
        123: {
          nuvemCode: 123,
          confirmed: false,
          realizedVisit: false,
        },
        6407: {
          nuvemCode: 6407,
          confirmed: true,
          realizedVisit: false,
        },
      },
    }],
  },
  scheduleVisit: {
    currentVisit: {},
  },

  asyncGetSchedule: () => ({}),
};


const store = mockStore(initialState);

describe('Testing VisitInvites', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(
      <VisitInvitesContainer />,
      { context: { store } },
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('it renders correctly with application loading', () => {
    const newInitialState = initialState;
    newInitialState.application.isLoading = true;
    const newStore = mockStore(newInitialState);
    const wrapper = shallow(
      <VisitInvitesContainer />,
      { context: { store: { ...newStore } } },
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Testing VisitInvites prototype methods', () => {
  const wrapper = shallow(<VisitInvitesContainer />, { context: { store } }).dive();
  const state = initialState.currentSchedule.content;

  wrapper.instance().setState({
    visit: {
      content: {
        ...state,
      },
    },
  });

  it('Testing getLocalization on sucess', async () => {
    const spy = jest.spyOn(VisitInvites.prototype, 'getLocalization');

    const mock = new MockAdapter(axios);

    mock.onGet(`${SCHOOL_ENDPOINT}/${initialState.currentSchedule.content.codSchool}`, {
      params: {
        campos: 'latitude,longitude',
      },
    }).reply(200, { latitude: -200, longitude: -300 });

    await wrapper.instance().getLocalization();
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('Testing getLocalization on failure', async () => {
    const spy = jest.spyOn(VisitInvites.prototype, 'getLocalization');

    const mock = new MockAdapter(axios);

    mock.onGet(`${SCHOOL_ENDPOINT}/${initialState.currentSchedule.content.codSchool}`, {
      params: {
        campos: 'latitude,longitude',
      },
    }).reply(400);

    Toast.default.Toast = jest.fn(param => ({}));

    try {
      await wrapper.instance().getLocalization();
    } catch (error) {
      expect(Toast.default.Toast.mock.calls.length).toBe(1);
    }
    spy.mockClear();
  });
});
