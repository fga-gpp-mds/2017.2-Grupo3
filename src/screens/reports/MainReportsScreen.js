import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { logInfo, logWarn } from '../../../logConfig/loggers';
import ShowToast from '../../components/Toast';
import {
  INTERNAL_ERROR,
  INSPECTION_SUCCEED,
} from '../../constants/toastMessages';
import {
  FINISH_INSPECTION,
  LEAVING_INSPECTION,
  INPECTION_ERROR,
} from '../../constants/alertTitlesMessages';
import {
  UNAUDITED,
  YES,
  NO,
  SCHOOL_SURROUNDINGS,
  FOOD_STOCK,
  DOCUMENTATION,
  FOOD_QUALITY,
  FOOD_HANDLER,
  REFECTORY,
  WATER_SEWER_SUPPLY,
  KITCHEN,
  FOOD_PREPARATION,
  OTHER_OBSERVATION,
} from '../../constants/counselorConstants';
import {
  POSTS_LINK_NUVEM_CIVICA,
} from '../../constants/linkConstants';
import {
  APP_IDENTIFIER,
  INSPECTION_POSTING_TYPE_CODE,
} from '../../constants/codeNumbers';
import {
  GET_CURRENT_SCHEDULE_ERROR,
  AFTER_INPECTION_POST_ERROR,
  UPDATE_CURRENT_SCHEDULE_ERROR,
  BEFORE_INPECTION_POST_ERROR,
} from '../../constants/errorConstants';
import { convertingJSONToString } from '../../actions/counselorActions';
import { errorGenerator } from '../../actions/schedulingVisitActions';
import Header from '../../components/Header';
import ButtonWithActivityIndicator from '../../components/ButtonWithActivityIndicator';
import styles from '../../Styles/MainReportsScreenStyles';

const FILE_NAME = 'MainReportsScreen.js';

// Component to each clickable text that goes to checklists.
const GoToChecklistClickableText = props => (
  <View style={styles.statusView}>
    <TouchableOpacity
      onPress={() => props.onPress()}
      key={props.goToChecklistKey}
    >
      <Text style={styles.text}>{props.goToChecklistText}</Text>
    </TouchableOpacity>

    <View>
      {props.isCompleted ? (
        <MaterialIcons
          name="check"
          size={28}
          style={{ paddingRight: 23 }}
          color="green"
        />
      ) : (<Text />)
      }
    </View>
  </View>
);

const treatingGenericInspectionError = (statusError) => {
  Alert.alert(
    'Ops, algo deu errado!',
    INPECTION_ERROR,
    [
      { text: 'Ok' },
    ],
  );

  logWarn(FILE_NAME, 'finishInspection',
    `Error with status: ${statusError}`);
};

// Used to return a readable response for the questions.
const getResponseOfQuestion = (item) => {
  // Verify if the item was marked to return if the check was Yes or No.
  if (item.status) {
    if (item.markedYes) {
      return YES;
    } if (item.markedNo) {
      return NO;
    }
  }

  // If the item wasn't marked it means that it was unaudited.
  return UNAUDITED;
};

/* Used to return the inspection result for default inspection results in JSON formart for
Nuvem. The default format is: Array of question itens in JSON format, a Observation Text
and a status tha indicate if it was concluded. */
const mountDefaultJsonOfInspectionResult = (
  defaultNameOfVerificationList,
  defaultChecklist,
  defaultTextObservation,
  defaultConcludedStatus,
) => {
  const defaultContentJSON = {
    nameOfVerificationList: defaultNameOfVerificationList,
    binaryQuestions: {},
    textObservation: defaultTextObservation,
    wasConcluded: defaultConcludedStatus,
  };

  defaultChecklist.forEach((item) => {
    defaultContentJSON.binaryQuestions[item.question] = {
      question: item.question,
      answer: getResponseOfQuestion(item),
    };
  });

  return defaultContentJSON;
};

// Since this screen has a special navigation logic, we made method here to control it.
const backNavigation = () => {
  Alert.alert(
    'SAIR DA FISCALIZAÇÃO',
    LEAVING_INSPECTION,
    [
      { text: 'Cancelar' },
      { text: 'Voltar', onPress: () => Actions.popTo('StartPendingInspection') },
    ],
  );
  return true;
};

export default class MainReportsScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backNavigation);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backNavigation);
  }

  async addContentsOnInspectionPostInNuvem(codPostagem, contentsListOfInspectionResults) {
    // Header to create a new content in inpection post.
    const headerToInspectionContent = {
      headers: {
        appToken: this.props.counselor.token,
      },
    };

    // Used to await all promises return after proceed with the function.
    const allContentsResponse = [];

    try {
      for (let i = 0; i < contentsListOfInspectionResults.length; i += 1) {
        logInfo(FILE_NAME, 'addContentsOnInspectionPostInNuvem',
          `Creating content for verification list: ${contentsListOfInspectionResults[i].nameOfVerificationList}`);

        // Body to create a new content in inpection post.
        const bodyToInspectionContent = {
          JSON: convertingJSONToString(contentsListOfInspectionResults[i]),
          texto: contentsListOfInspectionResults[i].nameOfVerificationList,
        };

        // Creating content in Inspection post.
        allContentsResponse.push(
          axios.post(`${POSTS_LINK_NUVEM_CIVICA}/${codPostagem}/conteudos`,
            bodyToInspectionContent,
            headerToInspectionContent),
        );
      }

      // Wait all contents be put successfully in inspection post.
      await Promise.all(allContentsResponse);

      logInfo(FILE_NAME, 'addContentsOnInspectionPostInNuvem',
        `After promise.all, ${allContentsResponse.length} contents were successfully put in inspection post.`);
    } catch (error) {
      logWarn(FILE_NAME, 'addContentsOnInspectionPostInNuvem', `Request result in an ${error}`);

      throw errorGenerator(AFTER_INPECTION_POST_ERROR, error.response.status);
    }
  }

  generateContentsListOfInspectionResults() {
    logInfo(FILE_NAME, 'generateContentsListOfInspectionResults', 'Generating contents list of inspection results.');

    const contentsListOfInspectionResults = [];

    // Used to mount the JSON result to school surroundings inspection.
    const resultOfSchoolSurroundingsInspection = mountDefaultJsonOfInspectionResult(
      SCHOOL_SURROUNDINGS,
      this.props.report.schoolSurroundings,
      this.props.report.schoolSurroundingsObservation,
      this.props.report.statusSchoolSurroundings,
    );

    // Put the school surroundings JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfSchoolSurroundingsInspection);

    // Used to mount the JSON result to Food Stock inspection.
    const resultOfFoodStock = mountDefaultJsonOfInspectionResult(
      FOOD_STOCK,
      this.props.report.foodStock,
      this.props.report.foodStockObservation,
      this.props.report.statusFoodStock,
    );

    // Put the Food Stock JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfFoodStock);

    // Used to mount the JSON result to Documentation inspection.
    const resultOfDocumentation = mountDefaultJsonOfInspectionResult(
      DOCUMENTATION,
      this.props.report.doc,
      this.props.report.docObservation,
      this.props.report.statusDoc,
    );

    // Put the Documentation JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfDocumentation);

    // Used to mount the JSON result to Food Quality inspection.
    const resultOfFoodQuality = mountDefaultJsonOfInspectionResult(
      FOOD_QUALITY,
      this.props.report.foodQuality,
      this.props.report.foodQualityObservation,
      this.props.report.statusFoodQuality,
    );

    // Adding additional information in this inspection result that isn't in a default form.
    resultOfFoodQuality.additionalData = {
      acceptedMenu: this.props.report.acceptedMenu,
      refusedMenu: this.props.report.refusedMenu,
    };

    // Put the Food Quality JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfFoodQuality);

    // Used to mount the JSON result to Food Handler inspection.
    const resultOfFoodHandler = mountDefaultJsonOfInspectionResult(
      FOOD_HANDLER,
      this.props.report.foodHandler,
      this.props.report.foodHandlerObservation,
      this.props.report.statusFoodHandler,
    );

    // Put the Food Handler JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfFoodHandler);

    // Used to mount the JSON result to refectory inspection.
    const resultOfRefectory = mountDefaultJsonOfInspectionResult(
      REFECTORY,
      this.props.report.refectory,
      this.props.report.refectoryObservation,
      this.props.report.statusRefectory,
    );

    // Put the refectory JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfRefectory);

    // Used to mount the JSON result to water Sewer Supply inspection.
    const resultOfWaterSewerSupply = mountDefaultJsonOfInspectionResult(
      WATER_SEWER_SUPPLY,
      this.props.report.waterSewerSupply,
      this.props.report.waterSewerSupplyObservation,
      this.props.report.statuSwaterSewerSupply,
    );

    // Put the water Sewer Supply JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfWaterSewerSupply);

    // Used to mount the JSON result to kitchen inspection.
    const resultOfKitchen = mountDefaultJsonOfInspectionResult(
      KITCHEN,
      this.props.report.kitchen,
      this.props.report.kitchenObservation,
      this.props.report.statusKitchen,
    );

    // Put the kitchen JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfKitchen);

    // Used to mount the JSON result to food Preparation inspection.
    const resultOfFoodPreparation = mountDefaultJsonOfInspectionResult(
      FOOD_PREPARATION,
      this.props.report.foodPreparation,
      this.props.report.foodPreparationObservation,
      this.props.report.statusFoodPreparation,
    );

    // Put the food Preparation JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfFoodPreparation);

    // Mounting the JSON result to other Observations of inspection. That one isn't in default form.
    const resultOfOtherObservation = {
      nameOfVerificationList: OTHER_OBSERVATION,
      textObservation: this.props.report.otherObservation,
      wasConcluded: this.props.report.statusReportObservation,
    };

    // Put the other Observations JSON result in the contents array that will be send to Nuvem.
    contentsListOfInspectionResults.push(resultOfOtherObservation);

    logInfo(FILE_NAME, 'generateContentsListOfInspectionResults', 'Contents list of inspection results were generated.');

    return contentsListOfInspectionResults;
  }

  async createInspectionPostInNuvem() {
    // Header to create a new inpection post.
    const headerToInspection = {
      headers: {
        appIdentifier: APP_IDENTIFIER,
        appToken: this.props.counselor.token,
      },
    };

    // Body to create a new inpection post.
    const bodyToInspection = {
      autor: {
        codPessoa: this.props.counselor.nuvemCode,
      },
      codGrupoDestino: this.props.counselor.codGrupoDestino,
      postagemRelacionada: {
        codPostagem: this.props.scheduleVisit.currentVisit.codPostagem,
      },
      tipo: {
        codTipoPostagem: INSPECTION_POSTING_TYPE_CODE,
      },
    };

    try {
      const response = await axios.post(POSTS_LINK_NUVEM_CIVICA,
        bodyToInspection,
        headerToInspection);

      logInfo(FILE_NAME, 'createInspectionPostInNuvem', `${JSON.stringify(response.data)}`);

      // Getting codPostagem returned in a link inside headers.
      const auxCodPostagem = response.headers.location.substr(response.headers.location.indexOf('postagens/'));
      const codPostagem = auxCodPostagem.substr(10);

      logInfo(FILE_NAME, 'createInspectionPostInNuvem', `Post code of inspection created: ${codPostagem}`);

      return codPostagem;
    } catch (error) {
      logWarn(FILE_NAME, 'createInspectionPostInNuvem', `Request result in an ${error}`);

      throw errorGenerator(BEFORE_INPECTION_POST_ERROR, error.response.status);
    }
  }

  // Prepare the results of inspection in blocks of information to send in post contents to Nuvem.
  async prepareAndSendInspectionResultsToNuvem() {
    const codPostagem = await this.createInspectionPostInNuvem();

    const contentsListOfInspectionResults = this.generateContentsListOfInspectionResults();

    logInfo(FILE_NAME, 'prepareAndSendInspectionResultsToNuvem',
      `List of JSONs with checklist contents: ${JSON.stringify(contentsListOfInspectionResults, null, 2)}`);

    await this.addContentsOnInspectionPostInNuvem(codPostagem, contentsListOfInspectionResults);
  }

  // Get the most current version of the schedule being inspected.
  async updateCurrentVersionOfScheduleInspected() {
    logInfo(FILE_NAME, 'updateCurrentVersionOfScheduleInspected',
      `Getting current version of schedule inspected. CodPostagem: ${this.props.scheduleVisit.currentVisit.codPostagem} CodConteudo: ${this.props.scheduleVisit.currentVisit.codConteudoPost}`);

    const getData = {
      appToken: this.props.counselor.token,
      codConteudoPost: this.props.scheduleVisit.currentVisit.codConteudoPost,
      codPostagem: this.props.scheduleVisit.currentVisit.codPostagem,
    };

    console.log(getData);

    await this.props.asyncGetCurrentSchedule(getData);

    logInfo(FILE_NAME, 'updateCurrentVersionOfScheduleInspected',
      'Current version of schedule inspected updated in store.');
  }

  // Change the post at Nuvem Cívica to inform that this counselor realized this visit.
  async changeCounselorRealizedVisitStatus() {
    logInfo(FILE_NAME, 'changeCounselorRealizedVisitStatus',
      'Updating counselor realized inspection status in visit data.');

    const newContentJSON = this.props.scheduleVisit.currentVisit.content;
    newContentJSON.visitListOfInvitees[this.props.counselor.nuvemCode].realizedVisit = true;

    const postData = {
      content: { ...newContentJSON },
      codConteudoPost: this.props.scheduleVisit.currentVisit.codConteudoPost,
      codPostagem: this.props.scheduleVisit.currentVisit.codPostagem,
    };

    await this.props.asyncUpdateSchedule(postData);

    logInfo(FILE_NAME, 'changeCounselorRealizedVisitStatus',
      'Counselor realized inspection status in visit data updated.');
  }

  // Make the final requests to finalize the inspect.
  async finishInspection() {
    this.props.syncIsLoading();

    try {
      await this.prepareAndSendInspectionResultsToNuvem();

      await this.updateCurrentVersionOfScheduleInspected();

      await this.changeCounselorRealizedVisitStatus();

      Alert.alert(
        'FISCALIZAÇÃO ENCERRADA',
        INSPECTION_SUCCEED,
        [
          { text: 'OK' },
        ],
      );
      Actions.mainScreen();
    } catch (error) {
      const errorJson = JSON.parse(error.message);

      switch (errorJson.name) {
        case BEFORE_INPECTION_POST_ERROR:
          treatingGenericInspectionError(errorJson.status);
          break;
        case AFTER_INPECTION_POST_ERROR:
        case GET_CURRENT_SCHEDULE_ERROR:
        case UPDATE_CURRENT_SCHEDULE_ERROR:
          // TODO(Here is needed delete the inspection post created)
          treatingGenericInspectionError(errorJson.status);
          break;
        default:
          ShowToast.Toast(INTERNAL_ERROR);
          logWarn(FILE_NAME, 'finishInspection',
            `Unknown Error -> status: ${errorJson.status}`);
          break;
      }
    }

    this.props.syncIsNotLoading();
  }

  render() {
    return (
      <View style={styles.content}>
        <Header
          title="Listas de verificação"
          onPress={() => backNavigation()}
        />
        <ScrollView>
          <View pointerEvents={this.props.clickableView}>
            <GoToChecklistClickableText
              goToChecklistKey={SCHOOL_SURROUNDINGS}
              goToChecklistText={SCHOOL_SURROUNDINGS}
              onPress={() => Actions.schoolSurroundingsCheckoutScreen()}
              isCompleted={this.props.report.statusSchoolSurroundings}
            />

            <GoToChecklistClickableText
              goToChecklistKey={FOOD_STOCK}
              goToChecklistText={FOOD_STOCK}
              onPress={() => Actions.stockFoodCheckoutScreen()}
              isCompleted={this.props.report.statusFoodStock}
            />

            <GoToChecklistClickableText
              goToChecklistKey={DOCUMENTATION}
              goToChecklistText={DOCUMENTATION}
              onPress={() => Actions.DocCheckoutScreen()}
              isCompleted={this.props.report.statusDoc}
            />

            <GoToChecklistClickableText
              goToChecklistKey={FOOD_QUALITY}
              goToChecklistText={FOOD_QUALITY}
              onPress={() => Actions.foodQualityCheckoutScreen()}
              isCompleted={this.props.report.statusFoodQuality}
            />

            <GoToChecklistClickableText
              goToChecklistKey={FOOD_HANDLER}
              goToChecklistText={FOOD_HANDLER}
              onPress={() => Actions.foodHandlerCheckoutScreen()}
              isCompleted={this.props.report.statusFoodHandler}
            />

            <GoToChecklistClickableText
              goToChecklistKey={REFECTORY}
              goToChecklistText={REFECTORY}
              onPress={() => Actions.refectoryCheckoutScreen()}
              isCompleted={this.props.report.statusRefectory}
            />

            <GoToChecklistClickableText
              goToChecklistKey={WATER_SEWER_SUPPLY}
              goToChecklistText={WATER_SEWER_SUPPLY}
              onPress={() => Actions.waterSewerSupplyCheckoutScreen()}
              isCompleted={this.props.report.statusWaterSewerSupply}
            />

            <GoToChecklistClickableText
              goToChecklistKey={KITCHEN}
              goToChecklistText={KITCHEN}
              onPress={() => Actions.kitchenCheckoutScreen()}
              isCompleted={this.props.report.statusKitchen}
            />

            <GoToChecklistClickableText
              goToChecklistKey={FOOD_PREPARATION}
              goToChecklistText={FOOD_PREPARATION}
              onPress={() => Actions.foodPreparationCheckoutScreen()}
              isCompleted={this.props.report.statusFoodPreparation}
            />

            <GoToChecklistClickableText
              goToChecklistKey={`+ ${OTHER_OBSERVATION}`}
              goToChecklistText={`+ ${OTHER_OBSERVATION}`}
              onPress={() => Actions.ReportObservationScreen()}
              isCompleted={this.props.report.statusReportObservation}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Anexar fotos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Gerar Relatório Final</Text>
            </TouchableOpacity>

            <ButtonWithActivityIndicator
              activityIndicatorStyle={styles.loading}
              onPress={() => Alert.alert(
                'ENCERRAR FISCALIZAÇÃO',
                FINISH_INSPECTION,
                [
                  { text: 'Cancelar' },
                  { text: 'Finalizar', onPress: () => this.finishInspection() },
                ],
              )}
              isLoading={this.props.isLoading}
              buttonKey="FinishInspectionButton"
              buttonText="Encerrar Fiscalização"
              buttonStyle={styles.buttonContainer}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

const {
  shape, string, number, bool, func,
} = PropTypes;

MainReportsScreen.propTypes = {
  isLoading: bool.isRequired,
  clickableView: string.isRequired,
  syncIsLoading: func.isRequired,
  asyncGetCurrentSchedule: func.isRequired,
  asyncUpdateSchedule: func.isRequired,
  syncIsNotLoading: func.isRequired,
  counselor: shape({
    token: string.isRequired,
    nuvemCode: number.isRequired,
  }).isRequired,
  scheduleVisit: shape({
    currentVisit: shape({
    }).isRequired,
  }).isRequired,
  report: shape({

  }).isRequired,
};

GoToChecklistClickableText.propTypes = {
  isCompleted: bool.isRequired,
  goToChecklistText: string.isRequired,
  onPress: func.isRequired,
  goToChecklistKey: string.isRequired,
};
