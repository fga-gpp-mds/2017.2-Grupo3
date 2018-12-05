import {
  SET_STOCKFOODREPORT_NEGATIVE,
  SET_STOCKFOODOBSERVATION,
  SET_STOCKFOODREPORT_POSITIVE,
  SET_REFECTORYREPORT_POSITIVE,
  SET_REFECTORYREPORT_NEGATIVE,
  SET_REFECTORYOBSERVATION,
  SET_KITCHENREPORT_POSITIVE,
  SET_KITCHENREPORT_NEGATIVE,
  SET_KITCHENOBSERVATION,
  SET_FOODQUALITYOBSERVATION,
  SET_FOODQUALITYREPORT_NEGATIVE,
  SET_FOODQUALITYREPORT_POSITIVE,
  SET_DOCREPORT_POSITIVE,
  SET_DOCREPORT_NEGATIVE,
  SET_DOCOBSERVATION,
  SET_REPORTOBSERVATION,
  SET_STATUSFOODQUALITY,
  SET_STATUSDOC,
  SET_STATUSKITCHEN,
  SET_STATUSREFECTORY,
  SET_STATUSREPORTOBSERVATION,
  SET_STATUSSCHOOLSURROUNDINGS,
  SET_STATUSSTOCKFOOD,
  SET_SCHOOLSURROUNDINGSOBSERVATION,
  SET_SCHOOLSURROUNDINGSREPORT_NEGATIVE,
  SET_SCHOOLSURROUNDINGSREPORT_POSITIVE,
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
} from './types';

export const setStockFoodReportPositive = key => ({
  type: SET_STOCKFOODREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setStockFoodReportNegative = key => ({
  type: SET_STOCKFOODREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setFoodStockObservation = observation => ({
  type: SET_STOCKFOODOBSERVATION,
  payload: observation,
});

export const setFoodHandlerReportPositive = key => ({
  type: SET_FOODHANDLERREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setFoodHandlerReportNegative = key => ({
  type: SET_FOODHANDLERREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setFoodHandlerObservation = observation => ({
  type: SET_FOODHANDLEROBSERVATION,
  payload: observation,
});

export const setFoodPreparationReportPositive = key => ({
  type: SET_FOODPREPARATIONREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setFoodPreparationReportNegative = key => ({
  type: SET_FOODPREPARATIONREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setFoodPreparationObservation = observation => ({
  type: SET_FOODPREPARATIONOBSERVATION,
  payload: observation,
});

export const setWaterSewerSupplyReportPositive = key => ({
  type: SET_WATERSEWERSUPPLYREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setWaterSewerSupplyReportNegative = key => ({
  type: SET_WATERSEWERSUPPLYREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setWaterSewerSupplyObservation = observation => ({
  type: SET_WATERSEWERSUPPLYOBSERVATION,
  payload: observation,
});

export const setKitchenReportPositive = key => ({
  type: SET_KITCHENREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setKitchenReportNegative = key => ({
  type: SET_KITCHENREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setKitchenObservation = observation => ({
  type: SET_KITCHENOBSERVATION,
  payload: observation,
});

export const setRefectoryReportPositive = key => ({
  type: SET_REFECTORYREPORT_POSITIVE,
  payload: {
    key,
  },
});
export const setRefectoryReportNegative = key => ({
  type: SET_REFECTORYREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setRefectoryObservation = observation => ({
  type: SET_REFECTORYOBSERVATION,
  payload: observation,
});

export const setFoodQualityReportPositive = key => ({
  type: SET_FOODQUALITYREPORT_POSITIVE,
  payload: {
    key,
  },
});
export const setFoodQualityReportNegative = key => ({
  type: SET_FOODQUALITYREPORT_NEGATIVE,
  payload: {
    key,
  },
});
export const setFoodQualityObservation = observation => ({
  type: SET_FOODQUALITYOBSERVATION,
  payload: observation,
});

export const setDocReportPositive = key => ({
  type: SET_DOCREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setDocReportNegative = key => ({
  type: SET_DOCREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setDocObservation = observation => ({
  type: SET_DOCOBSERVATION,
  payload: observation,
});

export const setAcceptedMenu = acceptedMenu => ({
  type: SET_ACCEPTEDMENU,
  payload: acceptedMenu,
});

export const setRefusedMenu = refusedMenu => ({
  type: SET_REFUSEDMENU,
  payload: refusedMenu,
});

export const setReportObservation = otherObservation => ({
  type: SET_REPORTOBSERVATION,
  payload: otherObservation,
});

export const setStatusFoodQuality = statusFoodQuality => ({
  type: SET_STATUSFOODQUALITY,
  payload: statusFoodQuality,
});

export const setStatusDoc = statusDoc => ({
  type: SET_STATUSDOC,
  payload: statusDoc,
});

export const setStatusFoodPreparation = statusFoodPreparation => ({
  type: SET_STATUSFOODPREPARATION,
  payload: statusFoodPreparation,
});

export const setStatusWaterSewerSupply = statusWaterSewerSupply => ({
  type: SET_STATUSWATERSEWERSUPPLY,
  payload: statusWaterSewerSupply,
});

export const setStatusKitchen = statusKitchen => ({
  type: SET_STATUSKITCHEN,
  payload: statusKitchen,
});

export const setStatusRefectory = statusRefectory => ({
  type: SET_STATUSREFECTORY,
  payload: statusRefectory,
});

export const setStatusReportObservation = statusRefectoryObservation => ({
  type: SET_STATUSREPORTOBSERVATION,
  payload: statusRefectoryObservation,
});

export const setStatusSchoolSurroundings = statusSchoolSurroundings => ({
  type: SET_STATUSSCHOOLSURROUNDINGS,
  payload: statusSchoolSurroundings,
});

export const setStatusFoodStock = statusStockFood => ({
  type: SET_STATUSSTOCKFOOD,
  payload: statusStockFood,
});

export const setStatusFoodHandler = statusFoodHandler => ({
  type: SET_STATUSFOODHANDLER,
  payload: statusFoodHandler,
});

export const setSchoolSurroundingsReportPositive = key => ({
  type: SET_SCHOOLSURROUNDINGSREPORT_POSITIVE,
  payload: {
    key,
  },
});

export const setSchoolSurroundingsReportNegative = key => ({
  type: SET_SCHOOLSURROUNDINGSREPORT_NEGATIVE,
  payload: {
    key,
  },
});

export const setSchoolSurroundingsObservation = observation => ({
  type: SET_SCHOOLSURROUNDINGSOBSERVATION,
  payload: observation,
});
