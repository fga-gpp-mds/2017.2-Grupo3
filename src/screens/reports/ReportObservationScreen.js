import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import { OTHER_OBSERVATION } from '../../constants/checklistConstants';
import Header from '../../components/Header';
import styles from '../../Styles/GeneralStyles';
import { backHandlerPop } from '../../NavigationFunctions';

export default class ReportObservationScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }

  concludeReport() {
    this.props.setStatusReportObservation(true);
    Actions.mainReportsScreen();
  }

  render() {
    return (
      <View style={styles.checklist.principal}>
        <Header
          title="Lista de verificação"
          subTitle={`+ ${OTHER_OBSERVATION}`}
        />
        <KeyboardAvoidingView style={styles.checklist.content} behavior="padding">
          <ScrollView>
            <View behavior="padding">
              <Text
                style={styles.checklist.observationText}
              >
Alguma observação adicional? Insira aqui. (Opcional)
              </Text>
              <View style={styles.checklist.observationBox}>
                <TextInput
                  onChangeText={text => this.props.setReportObservation(text)}
                  style={styles.checklist.textInput}
                  multiline
                  value={this.props.observation}
                  underlineColorAndroid="transparent"
                  placeholder="Observações gerais que gostaria de adicionar (opcional)"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.checklist.buttonContainer}
              onPress={() => this.concludeReport()
              }
              key="setObservation"
            >
              <Text style={styles.checklist.buttonText}>Concluir</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

ReportObservationScreen.propTypes = {
  setStatusReportObservation: PropTypes.func.isRequired,
  setReportObservation: PropTypes.func.isRequired,
  observation: PropTypes.string.isRequired,
};
