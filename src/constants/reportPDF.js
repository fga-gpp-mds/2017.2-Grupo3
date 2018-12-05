import {
  SCHOOL_SURROUNDINGS,
  WATER_SEWER_SUPPLY,
  FOOD_STOCK,
  DOCUMENTATION,
  FOOD_QUALITY, FOOD_HANDLER,
  REFECTORY,
  KITCHEN,
  FOOD_PREPARATION,
  OTHER_OBSERVATION,
} from './checklistConstants';

export const STYLE = `
  <style type="text/css" >
  th {
    background-color: #C7C7C7;
    color: black;
  }
  tr { 
    page-break-inside: avoid !important; 
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
    </style>`;

export const HEADER_DOC = `<!DOCTYPE html><head>${STYLE}</head>`;

export const OPEN_TABLE = '<table>';

export const CLOSE_TABLE = '</table>';

export const HEADER_TABLE = `
  <tr>
  <th>ID</th>
  <th>Questao</th>
  <th>Situacao</th>
  </tr>
  `;
export const OPEN_BODY = '<body>';
export const CLOSE_BODY = '</body>';

export const SECTIONS = {
  schoolSurroundings: SCHOOL_SURROUNDINGS,
  foodStock: FOOD_STOCK,
  doc: DOCUMENTATION,
  foodQuality: FOOD_QUALITY,
  foodHandler: FOOD_HANDLER,
  refectory: REFECTORY,
  waterSewerSupply: WATER_SEWER_SUPPLY,
  kitchen: KITCHEN,
  foodPreparation: FOOD_PREPARATION,
  otherObservation: OTHER_OBSERVATION,
};
