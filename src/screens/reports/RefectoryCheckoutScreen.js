import React from 'react';
import { Checkbox } from 'react-native-checkbox-field'; // Checkbox only
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
import { REFECTORY } from '../../constants/checklistConstants';
import Header from '../../components/Header';
import styles from '../../Styles/GeneralStyles';
import { backHandlerPop } from '../../NavigationFunctions';

export default class RefectoryCheckoutScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }

  showPositiveCheckBox(item) {
    return (
      <View>
        <Checkbox
          checkboxStyle={styles.checklist.checkBoxStyle}
          selected={item.markedYes}
          selectedColor="#008000"
          onSelect={() => {
            this.props.setRefectoryReportPositive(item.key);
            this.props.setStatusRefectory(false);
          }}
          disabled={item.markedNo}
          disabledColor={null}
        />
      </View>
    );
  }

  showNegativeCheckBox(item) {
    return (
      <View>
        <Checkbox
          checkboxStyle={styles.checklist.checkBoxStyle}
          selected={item.markedNo}
          selectedColor="#B22222"
          onSelect={() => {
            this.props.setRefectoryReportNegative(item.key);
            this.props.setStatusRefectory(false);
          }}
          disabled={item.markedYes}
          disabledColor={null}
        />
      </View>
    );
  }

  concludeReport() {
    this.props.setStatusRefectory(true);
    Actions.mainReportsScreen();
  }

  render() {
    return (
      <View style={styles.checklist.principal}>
        <Header
          title="Lista de verificação"
          subTitle={REFECTORY}
        />
        <KeyboardAvoidingView style={styles.checklist.content} behavior="padding">
          <ScrollView>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', paddingTop: 5, paddingLeft: 10 }}>Sim</Text>
                <Text style={{ fontWeight: 'bold', paddingTop: 5, paddingLeft: 20 }}>Nao</Text>
              </View>
              {
                this.props.report.map(item => (
                  <View style={styles.checklist.text} key={item.key}>
                    {this.showPositiveCheckBox(item)}
                    {this.showNegativeCheckBox(item)}
                    <Text style={styles.checklist.label}>{item.label}</Text>
                  </View>
                ))
              }
            </View>

            <View behavior="padding">
              <Text
                style={styles.checklist.observationText}
              >
Alguma observação adicional? Insira aqui. (Opcional)
              </Text>
              <View style={styles.checklist.observationBox}>
                <TextInput
                  onChangeText={text => this.props.setRefectoryObservation(text)}
                  style={styles.checklist.textInput}
                  value={this.props.observation}
                  multiline
                  underlineColorAndroid="transparent"
                  placeholder="Observações (opcional)"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.checklist.buttonContainer}
              onPress={() => this.concludeReport()}
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

RefectoryCheckoutScreen.propTypes = {
  setStatusRefectory: PropTypes.func.isRequired,
  setRefectoryObservation: PropTypes.func.isRequired,
  setRefectoryReportPositive: PropTypes.func.isRequired,
  setRefectoryReportNegative: PropTypes.func.isRequired,
  observation: PropTypes.string.isRequired,
  report: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.number,
  })).isRequired,
};
