import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setCounselor,
  setToken,
  setCounselorEdited,
  authenticatingCounselorInLogin,
  getUserProfileInLogin,
  asyncLoginCounselor,
  asyncEditCounselor,
} from '../../src/actions/counselorActions';
import {
  SET_COUNSELOR,
  SET_TOKEN,
  SET_COUNSELOR_EDITED,
  IS_LOADING,
  IS_NOT_LOADING,
} from '../../src/actions/types';
import {
  AUTHENTICATE_LINK_NUVEM_CIVICA,
  DEFAULT_USER_LINK_NUVEM_CIVICA,
} from '../../src/constants/linkConstants';
import { APP_IDENTIFIER } from '../../src/constants/codeNumbers';
import {
  AUTH_LOGIN_ERROR,
  PROFILE_LOGIN_ERROR,
  GROUP_LOGIN_ERROR,
  EDIT_ACCOUNT_ERROR,
  EDIT_PROFILE_ERROR,
} from '../../src/constants/errorConstants';
import * as auxiliary from '../../src/actions/auxiliary/editCounselorAuxiliary';
import { errorGenerator } from '../../src/actions/schedulingVisitActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing counselorActions', () => {
  it('Testing set Counselor', () => {
    const firstCounselor = {
      name: 'Rodolfo',
    };

    const actionReturn = setCounselor(firstCounselor);

    const secondCounselor = {
      name: 'Mario',
    };

    expect(actionReturn.payload.name).not.toEqual(secondCounselor.name);
    expect(actionReturn.payload.name).toEqual(firstCounselor.name);
    expect(actionReturn.type).toEqual(SET_COUNSELOR);
  });

  it('Testing set Counselor Token', () => {
    const firstToken = 'EuSouUmTokenGenerico';

    const actionReturn = setToken(firstToken);

    const secondToken = 'EuSouOutroTokenGenerico';

    expect(actionReturn.payload).not.toEqual(secondToken);
    expect(actionReturn.payload).toEqual(firstToken);
    expect(actionReturn.type).toEqual(SET_TOKEN);
  });

  it('Testing set Counselor Edited', () => {
    const firstCounselor = {
      name: 'Rodolfo',
      profile: {
        cpf: '12312312312',
        phone: '96661234',
        isPresident: false,
        segment: 'Titular',
        CAE_Type: 'Estadual',
        CAE: 'Distrito Federal',
      },
    };

    const actionReturn = setCounselorEdited(firstCounselor);

    const secondCounselor = {
      name: 'Mario',
      profile: {
        cpf: '12312312312',
        phone: '85554567',
        isPresident: true,
        segment: 'Suplente',
        CAE_Type: 'Municipal',
        CAE: 'Porto Velho',
      },
    };

    expect(actionReturn.payload.name).not.toEqual(secondCounselor.name);
    expect(actionReturn.payload.profile).not.toBe(secondCounselor.profile);
    expect(actionReturn.payload.name).toEqual(firstCounselor.name);
    expect(actionReturn.payload.profile).toBe(firstCounselor.profile);
    expect(actionReturn.type).toEqual(SET_COUNSELOR_EDITED);
  });
});

describe('Testing counselorActions login async actions', () => {
  const mock = new MockAdapter(axios);
  const counselor = {
    nuvemCode: 1,
    email: 'user@user.com',
    name: 'User',
    userName: 'username',
    password: 'password',
    token: 1,
    profile: {},
  };

  const authenticationHeader = {
    headers: {
      appIdentifier: APP_IDENTIFIER,
      email: 'user@user.com',
      senha: 'password',
    },
  };

  const errorStatus = {
    response: {
      status: 400,
    },
  };

  afterEach(() => {
    mock.reset();
  });

  it('Testing authenticatingCounselorInLogin', async () => {
    const response = {
      nomeCompleto: counselor.name,
      cod: counselor.nuvemCode,
      nomeUsuario: counselor.userName,
      password: counselor.password,
      apptoken: 1,
      email: counselor.email,
      profile: {},
    };

    mock.onGet(AUTHENTICATE_LINK_NUVEM_CIVICA, authenticationHeader)
      .reply(200, response, { apptoken: 1 });

    const actionReturn = await authenticatingCounselorInLogin(authenticationHeader);
    expect(actionReturn).toEqual(counselor);
  });

  it('Testing authenticatingCounselorInLogin catch', async () => {
    mock.onGet(AUTHENTICATE_LINK_NUVEM_CIVICA, authenticationHeader)
      .reply(400);

    try {
      await authenticatingCounselorInLogin(authenticationHeader);
    } catch (e) {
      const errorJson = JSON.parse(e.message);
      expect(errorJson.name).toBe(AUTH_LOGIN_ERROR);
      expect(errorJson.status).toBe(400);
    }
  });

  it('Testing getUserProfileInLogin', async () => {
    const response = { ...counselor, profile: 'campos' };
    mock.onGet(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselor.nuvemCode}/perfil`)
      .reply(200, { ...response, camposAdicionais: '\'campos\'' });

    const actionReturn = await getUserProfileInLogin(counselor);
    expect(actionReturn).toEqual(response);
  });

  it('Testing getUserProfileInLogin catch', async () => {
    const header = {
      headers: {
        appIdentifier: APP_IDENTIFIER,
      },
    };

    mock.onGet(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselor.nuvemCode}/perfil`, header)
      .reply(400);

    try {
      await getUserProfileInLogin(counselor);
    } catch (e) {
      const errorJson = JSON.parse(e.message);
      expect(errorJson.name).toBe(PROFILE_LOGIN_ERROR);
      expect(errorJson.status).toBe(400);
    }
  });

  it('Testing asyncLoginCounselor', () => {
    jest.mock('react-native-router-flux');

    const original = require.requireActual('../../src/actions/counselorActions');
    original.counselorActionsAuxiliary
      .authenticatingCounselorInLogin = jest.fn(() => Promise.resolve());
    original.counselorActionsAuxiliary.getUserProfileInLogin = jest.fn(() => Promise.resolve());
    original.counselorActionsAuxiliary.getCodGroup = jest.fn(() => Promise.resolve(counselor));

    const store = mockStore({});

    const expectedActions = [
      { type: IS_LOADING },
      { type: SET_COUNSELOR, payload: counselor },
      { type: IS_NOT_LOADING },
    ];

    return store.dispatch(asyncLoginCounselor(counselor)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Testing asyncLoginCounselor with getCodGroup catch', () => {
    jest.mock('react-native-router-flux');

    const original = require.requireActual('../../src/actions/counselorActions');
    original.counselorActionsAuxiliary
      .authenticatingCounselorInLogin = jest.fn(() => Promise.resolve());
    original.counselorActionsAuxiliary.getUserProfileInLogin = jest.fn(() => Promise.resolve());
    original.counselorActionsAuxiliary.getCodGroup =
      jest.fn(() => Promise.reject(errorGenerator(GROUP_LOGIN_ERROR, 400)));

    const store = mockStore({});

    return store.dispatch(asyncLoginCounselor(counselor)).catch((error) => {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(GROUP_LOGIN_ERROR);
    });
  });

  it('Testing asyncLoginCounselor with getUserProfileInLogin catch', () => {
    jest.mock('react-native-router-flux');

    const original = require.requireActual('../../src/actions/counselorActions');
    original.counselorActionsAuxiliary
      .authenticatingCounselorInLogin = jest.fn(() => Promise.resolve());
    original.counselorActionsAuxiliary
      .getUserProfileInLogin =
      jest.fn(() => Promise.reject(errorGenerator(PROFILE_LOGIN_ERROR, 400)));
    original.counselorActionsAuxiliary.getCodGroup = jest.fn(() => Promise.resolve());

    const store = mockStore({});

    const expectedActions = [
      { type: IS_NOT_LOADING },
    ];

    return store.dispatch(asyncLoginCounselor(counselor)).catch((error) => {
      expect(error).toEqual(errorStatus);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Testing asyncLoginCounselor with authenticatingCounselorInLogin catch', () => {
    jest.mock('react-native-router-flux');

    const original = require.requireActual('../../src/actions/counselorActions');
    original.counselorActionsAuxiliary
      .authenticatingCounselorInLogin =
      jest.fn(() => Promise.reject(errorGenerator(AUTH_LOGIN_ERROR, 400)));
    original.counselorActionsAuxiliary
      .getUserProfileInLogin = jest.fn(() => Promise.resolve());
    original.counselorActionsAuxiliary.getCodGroup = jest.fn(() => Promise.resolve());

    const store = mockStore({});

    const expectedActions = [
      { type: IS_NOT_LOADING },
    ];

    return store.dispatch(asyncLoginCounselor(counselor)).catch((error) => {
      expect(error).toEqual(errorStatus);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Testing asyncEditCounselor action', () => {
  let counselorData = null;

  beforeAll(() => {
    counselorData = {
      nuvemCode: 1,
      email: 'user@user.com',
      name: 'User',
      userName: 'username',
      password: 'password',
      token: 1,
      profile: {
        cpf: '11111111111',
        phone: '1111111111',
        isPresident: false,
        counselorType: 'Titular',
        segment: 'Pais de alunos',
        CAE_Type: 'Municipal',
        CAE: 'CAE',
        codGroup: 123,
        presidentChecked: false,
      },
    };
  });

  afterEach(() => {
    auxiliary.editAccountData.mockClear();
    auxiliary.editCounselorProfile.mockClear();
  });

  it('On Success', async () => {
    auxiliary.editAccountData = jest.fn(() => Promise.resolve());
    auxiliary.editCounselorProfile = jest.fn(() => Promise.resolve());

    const store = mockStore({});
    await store.dispatch(await asyncEditCounselor(counselorData));
    expect(auxiliary.editAccountData.mock.calls.length).toBe(1);
    expect(auxiliary.editCounselorProfile.mock.calls.length).toBe(1);
  });

  it('On Failure Account Error', async () => {
    auxiliary.editAccountData =
      jest.fn(() => Promise.reject(errorGenerator(EDIT_ACCOUNT_ERROR, 400)));
    auxiliary.editCounselorProfile =
      jest.fn(() => Promise.resolve());

    const store = mockStore({});
    try {
      await store.dispatch(await asyncEditCounselor(counselorData));
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(EDIT_ACCOUNT_ERROR);
    }
  });

  it('On Failure Profile Error', async () => {
    auxiliary.editAccountData = jest.fn(() => Promise.resolve());
    auxiliary.editCounselorProfile =
      jest.fn(() => Promise.reject(errorGenerator(EDIT_PROFILE_ERROR, 400)));

    const store = mockStore({});
    try {
      await store.dispatch(await asyncEditCounselor(counselorData));
    } catch (error) {
      console.log(error);
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(EDIT_PROFILE_ERROR);
    }
  });
});
