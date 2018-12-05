import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../src/actions/schedulingVisitActions';
import * as types from '../../src/actions/types';
import { POSTS_LINK_NUVEM_CIVICA } from '../../src/constants/linkConstants';
import * as mockActions from '../../src/actions/ManagerRegisterActions';
import {
  GET_CURRENT_SCHEDULE_ERROR,
  UPDATE_CURRENT_SCHEDULE_ERROR,
} from '../../src/constants/errorConstants';
import { convertingJSONToString } from '../../src/actions/applicationActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const MASTER_TOKEN = 1;

const postData = {
  codConteudoPost: 1,
  codPostagem: 1,
  content: {
    agentEmail: 'email@email.com',
    codSchool: 0,
    date: '0-0-0000',
    invitedAgent: false,
    schoolName: 'Nome da escola',
    time: '00:00',
    visitListOfInvitees: {},
  },
};

describe('Testing schedulingVisit updateSchedule', () => {
  let putScheduleHeader = null;
  let putScheduleBody = null;

  beforeAll(() => {
    putScheduleHeader = {
      headers: {
        appToken: MASTER_TOKEN,
      },
    };

    putScheduleBody = {
      JSON: convertingJSONToString(postData.content),
      texto: 'Agendamento',
    };
  });

  it('Test async updateSchedule success', async () => {
    const mock = new MockAdapter(axios);
    const store = mockStore({});
    mockActions.authenticatingMasterCounselor = jest.fn(() => 1);

    mock.onPut(
      `${POSTS_LINK_NUVEM_CIVICA}/${postData.codPostagem}/conteudos/${postData.codConteudoPost}`,
      putScheduleBody,
      putScheduleHeader).reply(200);

    await store.dispatch(actions.asyncUpdateSchedule(postData));

    const expectedPayload = [
      { type: types.IS_LOADING },
      { type: types.IS_NOT_LOADING },
    ];

    expect(store.getActions()).toEqual(expectedPayload);

    mock.reset();
    mock.restore();
  });

  it('Test async updateSchedule failure', async () => {
    const mock = new MockAdapter(axios);
    const store = mockStore({});
    mockActions.authenticatingMasterCounselor = jest.fn(() => 1);

    mock.onPut(
      `${POSTS_LINK_NUVEM_CIVICA}${postData.codPostagem}/conteudos/${postData.codConteudoPost}`,
      putScheduleBody,
      putScheduleHeader).reply(404);

    try {
      await store.dispatch(actions.asyncUpdateSchedule(postData));
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(UPDATE_CURRENT_SCHEDULE_ERROR);
      expect(errorJson.status).toBe(404);
    }

    mock.reset();
    mock.restore();
  });
});

describe('Testing scheduleVisit asyncGetCurrentSchedule', () => {
  let getData = null;
  let header = null;
  let response = null;

  beforeAll(() => {
    getData = {
      appToken: 1,
      codPostagem: 2,
      codConteudoPost: 3,
    };

    header = {
      headers: {
        appToken: getData.appToken,
      },
    };

    response = {
      postagem: {
        codPostagem: getData.codPostagem,
      },
      codConteudoPost: getData.codConteudoPost,
      JSON: "{'chave': 'valor'}",
    };
  });


  it('Testing asyncGetCurrentSchedule sucess', async () => {
    const mock = new MockAdapter(axios);
    const store = mockStore({});

    mock
      .onGet(`${POSTS_LINK_NUVEM_CIVICA}/${getData.codPostagem}/conteudos/${getData.codConteudoPost}`, header)
      .reply(200, { ...response });

    await store.dispatch(actions.asyncGetCurrentSchedule(getData));

    const possiblePayload = {
      codConteudoPost: getData.codConteudoPost,
      codPostagem: getData.codPostagem,
      content: {
        chave: 'valor',
      },
    };

    const expectedPayload = {
      type: types.SET_CURRENT_INSPECTION,
      payload: { ...possiblePayload },
    };

    expect(store.getActions()).toEqual([expectedPayload]);
    mock.reset();
    mock.restore();
  });
  it('Testing asyncGetCurrentSchedule failure', async () => {
    const mock = new MockAdapter(axios);
    const store = mockStore({});

    mock
      .onGet(`${POSTS_LINK_NUVEM_CIVICA}/${getData.codPostagem}/conteudos/${getData.codConteudoPost}`, header)
      .reply(400, { ...response });

    try {
      await store.dispatch(actions.asyncGetCurrentSchedule(getData));
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(GET_CURRENT_SCHEDULE_ERROR);
      expect(errorJson.status).toBe(400);
    }
    mock.reset();
    mock.restore();
  });
});
