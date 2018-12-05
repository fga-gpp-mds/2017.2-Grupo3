import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  DEFAULT_USER_LINK_NUVEM_CIVICA,
} from '../../../src/constants/linkConstants';
import {
  EDIT_ACCOUNT_ERROR,
  EDIT_PROFILE_ERROR,
} from '../../../src/constants/errorConstants';
import {
  editAccountData,
  editCounselorProfile,
} from '../../../src/actions/auxiliary/editCounselorAuxiliary';
import { convertingJSONToString, convertingContentStringToJSON } from '../../../src/actions/applicationActions';


describe('Testing editCounselorAuxiliary functions', () => {
  let mock = null;
  let counselorData = null;
  let headerToEditCounselor = null;
  let bodyToEditCounselor = null;
  let bodyToEditCounselorProfile = null;

  beforeAll(() => {
    mock = new MockAdapter(axios);
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

    headerToEditCounselor = {
      headers: {
        appToken: counselorData.token,
      },
    };

    bodyToEditCounselor = {
      nomeCompleto: counselorData.name,
      nomeUsuario: counselorData.userName,
    };

    const stringProfile = convertingJSONToString(counselorData.profile);

    // Creating body of PUT method.
    bodyToEditCounselorProfile = {
      camposAdicionais: stringProfile,
      tipoPerfil: {
        codTipoPerfil: 239,
      },
    };
  });

  afterEach(() => {
    mock.reset();
  });

  it('Testing editAccountData', async () => {
    mock.onPut(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorData.nuvemCode}`, bodyToEditCounselor)
      .reply((config) => {
        console.log(JSON.stringify(config));
        const data = convertingContentStringToJSON(config.data);
        const response = {
          nomeCompleto: data.nomeCompleto,
          nomeUsuario: data.nomeUsuario,
        };
        expect(data).toEqual(response);
        return [200];
      });
    await editAccountData(counselorData);
  });

  it('Testing editAccountData on failure', async () => {
    mock.onPut(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorData.nuvemCode}`, bodyToEditCounselor)
      .reply(400);

    try {
      await editAccountData(counselorData);
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(EDIT_ACCOUNT_ERROR);
    }
  });

  it('Testing editCounselorProfile', async () => {
    mock.onPut(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorData.nuvemCode}/perfil`, bodyToEditCounselorProfile)
      .reply((config) => {
        console.log(JSON.stringify(config));
        let data = config.data.replace(/\\\//g, '/');
        data = JSON.parse(data);
        expect(data).toEqual(bodyToEditCounselorProfile);
        return [200];
      });
    await editCounselorProfile(counselorData);
  });

  it('Testing editCounselorProfile failure', async () => {
    mock.onPut(
      `${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorData.nuvemCode}/perfil`, bodyToEditCounselorProfile)
      .reply(400);

    try {
      await editCounselorProfile(counselorData);
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(EDIT_PROFILE_ERROR);
    }
  });
});
