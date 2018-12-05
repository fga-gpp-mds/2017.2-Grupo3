import {
  SET_STOCKFOODREPORT_POSITIVE,
  SET_STOCKFOODREPORT_NEGATIVE,
  SET_STOCKFOODOBSERVATION,
  SET_REFECTORYREPORT_POSITIVE,
  SET_REFECTORYREPORT_NEGATIVE,
  SET_REFECTORYOBSERVATION,
  SET_KITCHENREPORT_POSITIVE,
  SET_KITCHENREPORT_NEGATIVE,
  SET_KITCHENOBSERVATION,
  SET_DOCREPORT_POSITIVE,
  SET_DOCREPORT_NEGATIVE,
  SET_DOCOBSERVATION,
  SET_REPORTOBSERVATION,
  SET_FOODQUALITYOBSERVATION,
  SET_FOODQUALITYREPORT_NEGATIVE,
  SET_FOODQUALITYREPORT_POSITIVE,
  SET_STATUSFOODQUALITY,
  SET_SCHOOLSURROUNDINGSOBSERVATION,
  SET_SCHOOLSURROUNDINGSREPORT_NEGATIVE,
  SET_SCHOOLSURROUNDINGSREPORT_POSITIVE,
  SET_STATUSDOC,
  SET_STATUSKITCHEN,
  SET_STATUSREFECTORY,
  SET_STATUSREPORTOBSERVATION,
  SET_STATUSSCHOOLSURROUNDINGS,
  SET_STATUSSTOCKFOOD,
  SET_ACCEPTEDMENU,
  SET_REFUSEDMENU,
  SET_FOODHANDLEROBSERVATION,
  SET_FOODHANDLERREPORT_POSITIVE,
  SET_FOODHANDLERREPORT_NEGATIVE,
  SET_STATUSFOODHANDLER,
  SET_WATERSEWERSUPPLYOBSERVATION,
  SET_WATERSEWERSUPPLYREPORT_POSITIVE,
  SET_WATERSEWERSUPPLYREPORT_NEGATIVE,
  SET_STATUSWATERSEWERSUPPLY,
  SET_FOODPREPARATIONOBSERVATION,
  SET_FOODPREPARATIONREPORT_POSITIVE,
  SET_FOODPREPARATIONREPORT_NEGATIVE,
  SET_STATUSFOODPREPARATION,
  RESET_REPORT,
} from '../actions/types';
import foodStock from '../constants/reports/foodStock';
import refectory from '../constants/reports/refectory';
import kitchen from '../constants/reports/kitchen';
import foodQuality from '../constants/reports/foodQuality';
import foodHandler from '../constants/reports/foodHandler';
import waterSewerSupply from '../constants/reports/waterSewerSupply';
import foodPreparation from '../constants/reports/foodPreparation';
import doc from '../constants/reports/doc';
import schoolSurroundings from '../constants/reports/schoolSurroundings';
import initialState from './initialState';
// import { logTrace, logWarn } from '../../logConfig/loggers';

// const FILE_NAME = 'reportReducer.js';

const reportReducer = (state = initialState.report, action) => {
  // logTrace(FILE_NAME, 'reportReducer',
  //   `Action Type received: ${action.type}`);

  if (action === undefined) {
    // logWarn(FILE_NAME, 'reportReducer',
    //   `ERROR: Action is undefined: ${JSON.stringify(action, null, 2)}`);

    return state;
  }

  switch (action.type) {
    case SET_STOCKFOODREPORT_POSITIVE:
      return {
        ...state,
        foodStock: state.foodStock.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_STOCKFOODREPORT_NEGATIVE:
      return {
        ...state,
        foodStock: state.foodStock.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_STOCKFOODOBSERVATION:
      return {
        ...state,
        foodStockObservation: action.payload,
      };
    case SET_WATERSEWERSUPPLYREPORT_POSITIVE:
      return {
        ...state,
        waterSewerSupply: state.waterSewerSupply.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_WATERSEWERSUPPLYREPORT_NEGATIVE:
      return {
        ...state,
        waterSewerSupply: state.waterSewerSupply.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_WATERSEWERSUPPLYOBSERVATION:
      return {
        ...state,
        waterSewerSupplyObservation: action.payload,
      };
    case SET_FOODPREPARATIONREPORT_POSITIVE:
      return {
        ...state,
        foodPreparation: state.foodPreparation.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_FOODPREPARATIONREPORT_NEGATIVE:
      return {
        ...state,
        foodPreparation: state.foodPreparation.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_FOODPREPARATIONOBSERVATION:
      return {
        ...state,
        foodPreparationObservation: action.payload,
      };
    case SET_FOODHANDLERREPORT_POSITIVE:
      return {
        ...state,
        foodHandler: state.foodHandler.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_FOODHANDLERREPORT_NEGATIVE:
      return {
        ...state,
        foodHandler: state.foodHandler.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_FOODHANDLEROBSERVATION:
      return {
        ...state,
        foodHandlerObservation: action.payload,
      };

    case SET_KITCHENREPORT_POSITIVE:
      return {
        ...state,
        kitchen: state.kitchen.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_KITCHENREPORT_NEGATIVE:
      return {
        ...state,
        kitchen: state.kitchen.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_KITCHENOBSERVATION:
      return {
        ...state,
        kitchenObservation: action.payload,
      };
    case SET_REFECTORYREPORT_POSITIVE:
      return {
        ...state,
        refectory: state.refectory.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_REFECTORYREPORT_NEGATIVE:
      return {
        ...state,
        refectory: state.refectory.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };

    case SET_REFECTORYOBSERVATION:
      return {
        ...state,
        refectoryObservation: action.payload,
      };
    case SET_FOODQUALITYREPORT_POSITIVE:
      return {
        ...state,
        foodQuality: state.foodQuality.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_FOODQUALITYREPORT_NEGATIVE:
      return {
        ...state,
        foodQuality: state.foodQuality.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_FOODQUALITYOBSERVATION:
      return {
        ...state,
        foodQualityObservation: action.payload,
      };
    case SET_ACCEPTEDMENU:
      return {
        ...state,
        acceptedMenu: action.payload,
      };
    case SET_REFUSEDMENU:
      return {
        ...state,
        refusedMenu: action.payload,
      };

    case SET_DOCREPORT_POSITIVE:
      return {
        ...state,
        doc: state.doc.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };

    case SET_DOCREPORT_NEGATIVE:
      return {
        ...state,
        doc: state.doc.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };

    case SET_DOCOBSERVATION:
      return {
        ...state,
        docObservation: action.payload,
      };

    case SET_REPORTOBSERVATION:
      return {
        ...state,
        otherObservation: action.payload,
      };

    case SET_STATUSFOODQUALITY:
      return {
        ...state,
        statusFoodQuality: action.payload,
      };
    case SET_STATUSDOC:
      return {
        ...state,
        statusDoc: action.payload,
      };
    case SET_STATUSFOODPREPARATION:
      return {
        ...state,
        statusFoodPreparation: action.payload,
      };
    case SET_STATUSWATERSEWERSUPPLY:
      return {
        ...state,
        statusWaterSewerSupply: action.payload,
      };
    case SET_STATUSKITCHEN:
      return {
        ...state,
        statusKitchen: action.payload,
      };
    case SET_STATUSFOODHANDLER:
      return {
        ...state,
        statusFoodHandler: action.payload,
      };
    case SET_STATUSREFECTORY:
      return {
        ...state,
        statusRefectory: action.payload,
      };
    case SET_STATUSREPORTOBSERVATION:
      return {
        ...state,
        statusReportObservation: action.payload,
      };
    case SET_STATUSSCHOOLSURROUNDINGS:
      return {
        ...state,
        statusSchoolSurroundings: action.payload,
      };
    case SET_STATUSSTOCKFOOD:
      return {
        ...state,
        statusFoodStock: action.payload,
      };
    case SET_SCHOOLSURROUNDINGSREPORT_POSITIVE:
      return {
        ...state,
        schoolSurroundings: state.schoolSurroundings.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };

    case SET_SCHOOLSURROUNDINGSREPORT_NEGATIVE:
      return {
        ...state,
        schoolSurroundings: state.schoolSurroundings.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };

    case SET_SCHOOLSURROUNDINGSOBSERVATION:
      return {
        ...state,
        schoolSurroundingsObservation: action.payload,
      };
    case RESET_REPORT:
      return {
        foodStock,
        foodStockObservation: '',
        refectory,
        refectoryObservation: '',
        kitchen,
        kitchenObservation: '',
        doc,
        docObservation: '',
        otherObservation: '',
        foodQuality,
        foodQualityObservation: '',
        acceptedMenu: '',
        refusedMenu: '',
        foodHandler,
        foodHandlerObservation: '',
        statusFoodHandler: false,
        foodPreparation,
        foodPreparationObservation: '',
        statusFoodPreparation: false,
        waterSewerSupply,
        waterSewerSupplyObservation: '',
        statuSwaterSewerSupply: false,
        statusFoodQuality: false,
        statusFoodStock: false,
        statusDoc: false,
        statusKitchen: false,
        statusRefectory: false,
        statusSchoolSurroundings: false,
        statusReportObservation: false,
        schoolSurroundings,
        schoolSurroundingsObservation: '',
      };
    default:
      return state;
  }
};

export default reportReducer;
