import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  DEFAULT_GROUP_LINK_NUVEM_CIVICA,
  DEFAULT_USER_LINK_NUVEM_CIVICA,
} from '../../../src/constants/linkConstants';
import {
  getCounselorFromGroup,
  getCounselor,
  getCounselorProfile,
  getGroup,
} from '../../../src/actions/auxiliary/getCounselorFromGroupAuxiliary';
import {
  GET_COUNSELORS_GROUP_LINKS_ERROR,
  GET_COUNSELORS_FROM_CAE_ACCOUNT_ERROR,
  GET_COUNSELORS_FROM_CAE_PROFILE_ERROR,
  GET_GROUP_ERROR,
} from '../../../src/constants/errorConstants';
import { APP_IDENTIFIER } from '../../../src/constants/codeNumbers';
import { convertingContentStringToJSON } from '../../../src/actions/applicationActions';

describe('Testing getCounselorFromGroupAuxiliary functions', () => {
  let mock = null;
  let codGroup = null;
  let counselorLink = null;
  let linkWithCodMembro = null;
  let counselorInformations = null;
  let getProfileHeader = null;
  let paramsToNuvem = null;

  beforeAll(() => {
    mock = new MockAdapter(axios);

    codGroup = 1;
    counselorLink = 'http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/pessoas/6832';
    linkWithCodMembro = 'http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/grupos/1118/membros/1068';
    counselorInformations = {
      nuvemCode: 6832,
      email: 'testecae@hotmail.com',
      name: 'Teste',
      codMembro: '1068',
      profile: {},
    };

    getProfileHeader = {
      headers: {
        appIdentifier: APP_IDENTIFIER,
      },
    };

    paramsToNuvem = {
      params: {
        codAplicativo: APP_IDENTIFIER,
        descricao: 'CAE',
      },
    };
  });

  afterEach(() => {
    mock.reset();
  });


  it('Testing getCounselorFromGroup', async () => {
    mock.onGet(`${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros`)
      .reply(200, [
        {
          links: [
            {
              href: 'http://testlink.com',
            },
            {
              href: 'http://testlink2.com',
            },
          ],
        },
      ],
    );
    const actionReturn = await getCounselorFromGroup(codGroup);
    expect(actionReturn[1]).toEqual(['http://testlink.com']);
    expect(actionReturn[0]).toEqual(['http://testlink2.com']);
  });

  it('Testing getCounselorFromGroup on failure', async () => {
    mock.onGet(`${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros`)
      .reply(400);

    try {
      await await getCounselorFromGroup(codGroup);
    } catch (error) {
      console.log(error.stack);
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(GET_COUNSELORS_GROUP_LINKS_ERROR);
    }
  });

  it('Testing getCounselor', async () => {
    mock.onGet(counselorLink)
      .reply(200, {
        nomeUsuario: 'testecae@hotmail.com',
        nomeCompleto: 'Teste',
        cod: 6832,
        email: 'testecae@hotmail.com',
        emailVerificado: false,
      });
    const actionReturn = await getCounselor(counselorLink, linkWithCodMembro);
    expect(actionReturn).toEqual([counselorInformations, 6832]);
  });

  it('Testing editCounselorProfile failure', async () => {
    mock.onGet(counselorLink)
      .reply(400);

    try {
      await getCounselor(counselorLink, linkWithCodMembro);
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(GET_COUNSELORS_FROM_CAE_ACCOUNT_ERROR);
    }
  });

  it('Testing getCounselorProfile', async () => {
    const campos = `
    {'cpf':'54545184848',
    'phone':'64575481884',
    'isPresident':false,
    'presidentChecked':false,
    'counselorType':'Suplente',
    'segment':'Trabalhadores da educação',
    'CAE_Type':'Municipal',
    'CAE_UF':'GO - Goiás',
    'CAE_municipalDistrict':'Aloândia -',
    'CAE':'Aloândia - GO'}`;
    mock.onGet(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorInformations.nuvemCode}/perfil`, getProfileHeader)
      .reply(200, {
        camposAdicionais: campos,
      });
    const actionReturn = await getCounselorProfile(
      counselorInformations, counselorInformations.nuvemCode);
    const profile = convertingContentStringToJSON(campos);
    const finalCounselor = counselorInformations;
    finalCounselor.profile = profile;
    expect(actionReturn).toEqual(finalCounselor);
  });
  it('Testing getCounselorProfile failure', async () => {
    mock.onGet(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${counselorInformations.nuvemCode}/perfil`, getProfileHeader)
      .reply(400);
    try {
      await getCounselorProfile(
        counselorInformations, counselorInformations.nuvemCode);
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(GET_COUNSELORS_FROM_CAE_PROFILE_ERROR);
    }
  });
  it('Testing getGroup', async () => {
    mock.onGet(DEFAULT_GROUP_LINK_NUVEM_CIVICA, paramsToNuvem)
      .reply(200, [{
        codGrupo: 1,
      }]);
    const actionReturn = await getGroup('CAE');
    expect(actionReturn).toEqual(1);
  });
  it('Testing getGroup failure', async () => {
    mock.onGet(DEFAULT_GROUP_LINK_NUVEM_CIVICA, paramsToNuvem)
      .reply(400);
    try {
      await getGroup('CAE');
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      expect(errorJson.name).toBe(GET_GROUP_ERROR);
    }
  });
});
