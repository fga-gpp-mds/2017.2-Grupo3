import React from 'react';
import { Checkbox } from 'react-native-checkbox-field'; // Checkbox only
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../components/Header';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  buttonContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    marginBottom: 9,
    flex: 6,
    flexDirection: 'column',
  },

  checkbox: {
    height: 25,
    borderWidth: 2,
    width: 25,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderColor: 'black',
    borderRadius: 2,
    flexWrap: 'wrap',
  },
  text: {
    flexDirection: 'row',
  },
  label: {
    paddingTop: 15,
    fontSize: 15,
    flex: 1,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: height * 0.25,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: width * 0.05,
    textAlignVertical: 'top',
  },
  textBox: {
    paddingLeft: 10,
    paddingTop: 30,
    paddingRight: 10,
  },
});

export default class DocCheckoutScreen extends React.Component {
  showPositiveCheckBox(item) {
    return (
      <View>
        <Checkbox
          checkboxStyle={styles.checkbox}
          selected={item.markedYes}
          selectedColor={'#008000'}
          onSelect={() => this.props.setDocReportPositive(item.key)}
          disabled={item.markedNo}
          disabledColor={null}
        />
      </View>
    );
  }

  concludeReport() {
    this.props.setStatusDoc(true);
    Actions.mainReportsScreen();
  }

  showNegativeCheckBox(item) {
    return (
      <View>
        <Checkbox
          checkboxStyle={styles.checkbox}
          selected={item.markedNo}
          selectedColor={'#B22222'}
          onSelect={() => this.props.setDocReportNegative(item.key)}
          disabled={item.markedYes}
          disabledColor={null}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.principal}>
        <Header
          title={'Relatório'}
          subTitle={'Documentação'}
          backButton
        />
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <ScrollView>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', paddingTop: 5, paddingLeft: 10 }}>Sim</Text>
                <Text style={{ fontWeight: 'bold', paddingTop: 5, paddingLeft: 20 }}>Nao</Text>
              </View>
              {
                this.props.report.map(item => (
                  <View style={styles.text} key={item.key}>
                    {this.showPositiveCheckBox(item)}
                    {this.showNegativeCheckBox(item)}
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                ),
                )
              }
            </View>

            <View behavior="padding">
              <View style={styles.textBox}>
                <TextInput
                  onChangeText={text => this.props.setDocObservation(text)}
                  style={styles.textInput}
                  multiline
                  value={this.props.observation}
                  underlineColorAndroid="transparent"
                  placeholder="Observações (opcional)"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.concludeReport()}
              key="setObservation"
            >
              <Text style={styles.buttonText}>Concluir</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

DocCheckoutScreen.propTypes = {
  setStatusDoc: PropTypes.func.isRequired,
  setDocObservation: PropTypes.func.isRequired,
  setDocReportPositive: PropTypes.func.isRequired,
  setDocReportNegative: PropTypes.func.isRequired,
  observation: PropTypes.string.isRequired,
  report: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.number,
  })).isRequired,
};
