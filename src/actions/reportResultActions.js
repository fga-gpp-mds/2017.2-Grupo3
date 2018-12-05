import axios from 'axios';
import {
  DOCUMENTATION,
  SCHOOL_SURROUNDINGS,
  FOOD_STOCK,
  FOOD_QUALITY,
  FOOD_HANDLER,
  REFECTORY,
  WATER_SEWER_SUPPLY,
  KITCHEN,
  FOOD_PREPARATION,
  OTHER_OBSERVATION,
} from '../constants/checklistConstants';
import {
  POSTS_LINK_NUVEM_CIVICA,
} from '../constants/linkConstants';
import {
  APP_IDENTIFIER,
  INSPECTION_POSTING_TYPE_CODE,
} from '../constants/codeNumbers';
import {
  SET_CURRENT_REPORT_RESULT_FOOD_STOCKS,
  SET_CURRENT_REPORT_RESULT_DOC,
  SET_CURRENT_REPORT_RESULT_FOOD_QUALITY,
  SET_CURRENT_REPORT_RESULT_FOOD_HANDLER,
  SET_CURRENT_REPORT_RESULT_WATER_SEWER_SUPPLY,
  SET_CURRENT_REPORT_RESULT_KITCHEN,
  SET_CURRENT_REPORT_RESULT_FOOD_PREPARATION,
  SET_CURRENT_REPORT_RESULT_OTHER_OBSERVATION,
  SET_CURRENT_REPORT_RESULT_REFECTORY,
  SET_CURRENT_REPORT_RESULT_SCHOOL_SURROUNDINGS,
  IS_LOADING_RESULT,
  IS_NOT_LOADING_RESULT,
} from './types';

import foodStock from '../constants/reports/foodStock';
import refectory from '../constants/reports/refectory';
import kitchen from '../constants/reports/kitchen';
import foodQuality from '../constants/reports/foodQuality';
import foodHandler from '../constants/reports/foodHandler';
import waterSewerSupply from '../constants/reports/waterSewerSupply';
import foodPreparation from '../constants/reports/foodPreparation';
import doc from '../constants/reports/doc';
import schoolSurroundings from '../constants/reports/schoolSurroundings';
import { logWarn } from '../../logConfig/loggers';
import { convertingContentStringToJSON } from './applicationActions';
import treatingError from './errorUtils';

const FILE_NAME = 'reportResultActions.js';

export const setCurrentReportResultRefectory = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_REFECTORY,
  payload: reportResult,
});

export const setCurrentReportResultSchoolSurroundings = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_SCHOOL_SURROUNDINGS,
  payload: reportResult,
});

export const setCurrentReportResultFoodStocks = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_FOOD_STOCKS,
  payload: reportResult,
});

export const setCurrentReportResultDoc = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_DOC,
  payload: reportResult,
});

export const setCurrentReportResultFoodQuality = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_FOOD_QUALITY,
  payload: reportResult,
});

export const setCurrentReportResultFoodHandler = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_FOOD_HANDLER,
  payload: reportResult,
});

export const setCurrentReportResultWaterSewerSupply = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_WATER_SEWER_SUPPLY,
  payload: reportResult,
});

export const setCurrentReportResultKitchen = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_KITCHEN,
  payload: reportResult,
});

export const setCurrentReportResultFoodPreparation = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_FOOD_PREPARATION,
  payload: reportResult,
});

export const setCurrentReportResultOtherObservation = reportResult => ({
  type: SET_CURRENT_REPORT_RESULT_OTHER_OBSERVATION,
  payload: reportResult,
});

export const isLoadingResult = () => ({
  type: IS_LOADING_RESULT,
});

export const isNotLoadingResult = () => ({
  type: IS_NOT_LOADING_RESULT,
});

export const getQuestions = (json, baseQuestions) => {
  const questions = baseQuestions.map((item) => {
    const questionBody = json.binaryQuestions[item.question];
    const question = {
      ...questionBody,
      label: item.label,
    };
    return question;
  });
  return questions;
};

export const extractJson = async (json, dispatch) => {
  switch (json.nameOfVerificationList) {
    case REFECTORY: {
      const reportResultRefectory = {
        questions: getQuestions(json, refectory),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultRefectory(reportResultRefectory));
      break;
    }
    case SCHOOL_SURROUNDINGS: {
      const reportResultSchoolSurroundings = {
        questions: getQuestions(json, schoolSurroundings),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultSchoolSurroundings(reportResultSchoolSurroundings));
      break;
    }
    case WATER_SEWER_SUPPLY: {
      const reportResultWaterSewerSupply = {
        questions: getQuestions(json, waterSewerSupply),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultWaterSewerSupply(reportResultWaterSewerSupply));
      break;
    }
    case FOOD_HANDLER: {
      const reportResultFoodHandler = {
        questions: getQuestions(json, foodHandler),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultFoodHandler(reportResultFoodHandler));
      break;
    }
    case DOCUMENTATION: {
      const reportResultDoc = {
        questions: getQuestions(json, doc),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultDoc(reportResultDoc));
      break;
    }
    case FOOD_PREPARATION: {
      const reportResultFoodPreparation = {
        questions: getQuestions(json, foodPreparation),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultFoodPreparation(reportResultFoodPreparation));
      break;
    }
    case FOOD_STOCK: {
      const reportResultFoodStock = {
        questions: getQuestions(json, foodStock),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultFoodStocks(reportResultFoodStock));
      break;
    }
    case KITCHEN: {
      const reportResultKitchen = {
        questions: getQuestions(json, kitchen),
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultKitchen(reportResultKitchen));
      break;
    }
    case FOOD_QUALITY: {
      const reportResultFoodQuality = {
        questions: getQuestions(json, foodQuality),
        status: json.wasConcluded,
        additionalData: json.additionalData,
      };
      dispatch(setCurrentReportResultFoodQuality(reportResultFoodQuality));
      break;
    }
    case OTHER_OBSERVATION: {
      const reportResultObservation = {
        status: json.wasConcluded,
        textObservation: json.textObservation,
      };
      dispatch(setCurrentReportResultOtherObservation(reportResultObservation));
      break;
    }
    default: break;
  }
};

export const getContentInPost = async (getData, item, dispatch) => {
  const header = {
    headers: {
      appToken: getData.appToken,
    },
  };

  let json = [];

  try {
    const response = await axios.get(item.links[0].href, header);
    json = await extractJson(convertingContentStringToJSON(response.data.JSON), dispatch);
  } catch (error) {
    logWarn(FILE_NAME, 'reportResult',
      `Request result in an ${error}`);
    treatingError(error);
  }

  return json;
};

export const asyncGetCurrentPost = getData => async (dispatch) => {
  const header = {
    headers: {
      appToken: getData.appToken,
    },
    params: {
      codPostagemRelacionada: getData.codPostagem,
      codTiposPostagem: INSPECTION_POSTING_TYPE_CODE,
      appIdentifier: APP_IDENTIFIER,
    },
  };
  try {
    const response = await axios.get(POSTS_LINK_NUVEM_CIVICA, header);
    return Promise.all(response.data[0].conteudos.map(item => getContentInPost(getData, item, dispatch)));
  } catch (error) {
    logWarn(FILE_NAME, 'reportResult',
      `Request result in an ${error}`);
    treatingError(error);
  }

  return null;
};
