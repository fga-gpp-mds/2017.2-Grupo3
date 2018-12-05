import axios from 'axios';
import { convertingProfileStringToJSON } from '../counselorActions';
import {
  GET_COUNSELORS_GROUP_LINKS_ERROR,
  GET_COUNSELORS_FROM_CAE_ACCOUNT_ERROR,
  GET_COUNSELORS_FROM_CAE_PROFILE_ERROR,
  GET_GROUP_ERROR,
} from '../../constants/errorConstants';
import {
  DEFAULT_GROUP_LINK_NUVEM_CIVICA,
  DEFAULT_USER_LINK_NUVEM_CIVICA,
} from '../../constants/linkConstants';
import { APP_IDENTIFIER } from '../../constants/codeNumbers';
import { errorGenerator } from '../schedulingVisitActions';


export const getCounselorFromGroup = async (codGroup) => {
  try {
    const response = await axios.get(`${DEFAULT_GROUP_LINK_NUVEM_CIVICA}${codGroup}/membros`);
    const counselorLinks = [];
    const linksWithCodMembro = [];

    for (let i = 0; i < response.data.length; i += 1) {
      counselorLinks.push(response.data[i].links[1].href);
      linksWithCodMembro.push(response.data[i].links[0].href);
    }

    return [counselorLinks, linksWithCodMembro];
  } catch (error) {
    throw errorGenerator(GET_COUNSELORS_GROUP_LINKS_ERROR, error.response.status);
  }
};

export const getCounselor = async (counselorLink, linkWithCodMembro) => {
  try {
    const response = await axios.get(counselorLink);
    const auxCodMembro = linkWithCodMembro.substr(linkWithCodMembro.indexOf('membros/'));
    const codMembro = auxCodMembro.substr(8);
    const counselorInformations = {
      nuvemCode: response.data.cod,
      email: response.data.email,
      name: response.data.nomeCompleto,
      codMembro,
      profile: {},
    };
    return [counselorInformations, response.data.cod];
  } catch (error) {
    throw errorGenerator(GET_COUNSELORS_FROM_CAE_ACCOUNT_ERROR, error.response.status);
  }
};

export const getCounselorProfile = async (counselorInformations, nuvemCode) => {
  const getProfileHeader = {
    headers: {
      appIdentifier: APP_IDENTIFIER,
    },
  };
  try {
    console.log(nuvemCode);
    const response = await axios.get(`${DEFAULT_USER_LINK_NUVEM_CIVICA}${nuvemCode}/perfil`, getProfileHeader);
    const profile = convertingProfileStringToJSON(response.data.camposAdicionais);
    const completeCounselorInformations = counselorInformations;

    completeCounselorInformations.profile = profile;
    return completeCounselorInformations;
  } catch (error) {
    throw errorGenerator(GET_COUNSELORS_FROM_CAE_PROFILE_ERROR, error.response.status);
  }
};

export const getGroup = async (CAE) => {
  const paramsToNuvem = {
    params: {
      codAplicativo: APP_IDENTIFIER,
      descricao: CAE,
    },
  };

  try {
    const response = await axios.get(DEFAULT_GROUP_LINK_NUVEM_CIVICA, paramsToNuvem);
    const codGroup = response.data[0].codGrupo;
    return codGroup;
  } catch (error) {
    throw errorGenerator(GET_GROUP_ERROR, error.response.status);
  }
};
