
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../src/actions/ManagerRegisterActions';
import * as types from '../../src/actions/types';
import {
  COUNSELOR_DISABLED_SUCCESS,
  COUNSELOR_DISABLED_FAILED,
  COUNSELOR_GROUP_DISABLED_SUCCESS,
  COUNSELOR_GROUP_DISABLED_FAILED,
} from '../../src/constants/toastMessages';
import {
  AUTHENTICATE_LINK_NUVEM_CIVICA,
  DEFAULT_USER_LINK_NUVEM_CIVICA,
  DEFAULT_GROUP_LINK_NUVEM_CIVICA,
} from '../../src/constants/linkConstants';
import { APP_IDENTIFIER } from '../../src/constants/codeNumbers';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const MASTER_TOKEN = 1;

const disableAppHeader = {
  headers: {
    appIdentifier: APP_IDENTIFIER,
    appToken: MASTER_TOKEN,
  },
};

const counselor = {
  nuvemCode: 1,
};

const codGroup = '1';

describe('Testing manage registers actions', () => {
  it('Test disableCounselorFromApp when disable is successfull', async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselor.nuvemCode}/perfil`).reply(200);

    const actionReturn = await actions.disableCounselorFromApp(counselor, MASTER_TOKEN);
    expect(actionReturn).toBe(COUNSELOR_DISABLED_SUCCESS);
  });

  it('Test disableCounselorFromApp when disable fails', async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}2/perfil`,
      disableAppHeader)
      .reply(200);

    try {
      await actions.disableCounselorFromApp(counselor, MASTER_TOKEN);
    } catch (e) {
      expect(e).toEqual(COUNSELOR_DISABLED_FAILED);
    }
  });

  it('Test authenticatingMasterCounselor when authentication is successfull', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(
      `${AUTHENTICATE_LINK_NUVEM_CIVICA}`, disableAppHeader)
      .reply(200, null, { apptoken: MASTER_TOKEN });

    const response = await actions.authenticatingMasterCounselor();
    expect(response).toEqual(MASTER_TOKEN);
  });

  it('Test authenticatingMasterCounselor when authentication fails', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(
      `${AUTHENTICATE_LINK_NUVEM_CIVICA}`, { headers: { appIdentifier: 3 } });

    try {
      await actions.authenticatingMasterCounselor();
    } catch (e) {
      expect(e.message).toEqual('Não foi possível adquirir token para desassociação.');
    }
  });

  it('Test disableCounselorFromGroup when disable is successfull', async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete(
      `${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros/${counselor.codMembro}`).reply(200);

    const actionReturn = await actions.disableCounselorFromGroup(counselor, codGroup, MASTER_TOKEN);

    expect(actionReturn).toBe(COUNSELOR_GROUP_DISABLED_SUCCESS);
  });

  it('Test disableCounselorFromGroup when disable is unsuccessfull', async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete(
      `${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros/${counselor.codMembro}`);

    await actions.disableCounselorFromGroup(counselor, codGroup, MASTER_TOKEN)
      .catch((message) => { expect(message).toBe(COUNSELOR_GROUP_DISABLED_FAILED); });
  });

  it('Test disable counselor from group when disable is successfull', async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselor.nuvemCode}/perfil`).reply(200);

    mock.onGet(
      `${AUTHENTICATE_LINK_NUVEM_CIVICA}`, disableAppHeader)
      .reply(200, null, { apptoken: MASTER_TOKEN });

    mock.onDelete(
      `${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros/${counselor.codMembro}`).reply(200);

    const store = mockStore({});

    jest.mock('react-native-router-flux');

    const expectedPayload = {
      type: types.RESET_LIST,
    };

    await store.dispatch(actions.disableCounselor(counselor, codGroup)).then(() => {
      expect(store.getActions()).toEqual([expectedPayload]);
    });
  });

  it('Test disable counselor from group when disable fails', async () => {
    const mock = new MockAdapter(axios);

    mock.onGet(
      `${AUTHENTICATE_LINK_NUVEM_CIVICA}`, disableAppHeader)
      .reply(200, null, { apptoken: MASTER_TOKEN });

    mock.onDelete(
      `${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros/${counselor.codMembro}`).reply(200);

    const store = mockStore({});

    jest.mock('react-native-router-flux');


    await store.dispatch(actions.disableCounselor(counselor, codGroup))
      .catch((message) => {
        expect(message).toBe(COUNSELOR_DISABLED_FAILED);
      });
  });
});
