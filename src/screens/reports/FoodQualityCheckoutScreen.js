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
import { FOOD_QUALITY } from '../../constants/checklistConstants';
import Header from '../../components/Header';
import styles from '../../Styles/GeneralStyles';
import { backHandlerPop } from '../../NavigationFunctions';

export default class FoodQualityCheckoutScreen extends React.Component {
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
            this.props.setFoodQualityReportPositive(item.key);
            this.props.setStatusFoodQuality(false);
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
            this.props.setFoodQualityReportNegative(item.key);
            this.props.setStatusFoodQuality(false);
          }}
          disabled={item.markedYes}
          disabledColor={null}
        />
      </View>
    );
  }

  concludeReport() {
    this.props.setStatusFoodQuality(true);
    Actions.mainReportsScreen();
  }

  render() {
    return (
      <View style={styles.checklist.principal}>
        <Header
          title="Lista de verificação"
          subTitle={FOOD_QUALITY}
        />
        <KeyboardAvoidingView style={styles.checklist.content} behavior="padding">
          <ScrollView>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.checklist.optionStyle}>Sim</Text>
                <Text style={styles.checklist.optionStyle}>Nao</Text>
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

            <View>
              <Text
                style={styles.checklist.observationText}
              >
Qual o cardápio mais aceito?
              </Text>
              <View style={styles.checklist.observationBox}>
                <TextInput
                  onChangeText={text => this.props.setAcceptedMenu(text)}
                  style={styles.checklist.textInput}
                  value={this.props.acceptedMenu}
                  multiline
                  underlineColorAndroid="transparent"
                  placeholder="Observação sobre o cardápio"
                />
              </View>
            </View>

            <View>
              <Text
                style={styles.checklist.observationText}
              >
Qual o cardápio menos aceito?
              </Text>
              <View style={styles.checklist.observationBox}>
                <TextInput
                  onChangeText={text => this.props.setRefusedMenu(text)}
                  style={styles.checklist.textInput}
                  value={this.props.refusedMenu}
                  multiline
                  underlineColorAndroid="transparent"
                  placeholder="Observação sobre o cardápio"
                />
              </View>
            </View>

            <View behavior="padding">
              <Text
                style={styles.checklist.observationText}
              >
Alguma observação adicional? Insira aqui. (Opcional)
              </Text>
              <View style={styles.checklist.observationBox}>
                <TextInput
                  onChangeText={text => this.props.setFoodQualityObservation(text)}
                  style={styles.checklist.textInput}
                  value={this.props.observation}
                  multiline
                  underlineColorAndroid="transparent"
                  placeholder="Observações gerais (opcional)"
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

FoodQualityCheckoutScreen.propTypes = {
  setAcceptedMenu: PropTypes.func.isRequired,
  setRefusedMenu: PropTypes.func.isRequired,
  setStatusFoodQuality: PropTypes.func.isRequired,
  setFoodQualityObservation: PropTypes.func.isRequired,
  setFoodQualityReportPositive: PropTypes.func.isRequired,
  setFoodQualityReportNegative: PropTypes.func.isRequired,
  observation: PropTypes.string.isRequired,
  acceptedMenu: PropTypes.string.isRequired,
  refusedMenu: PropTypes.string.isRequired,
  report: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.number,
  })).isRequired,
};
