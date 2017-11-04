import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
import SchoolData from '../components/SchoolData';


const styles = StyleSheet.create({

  principal: {
    flex: 1,
  },

  schedullingButton: {
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  button: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  Container: {
    flex: 1,
    marginTop: 20,
  },

  Picker: {
    marginHorizontal: 15,
    paddingLeft: 10,
    width: '95%',
  },

  icon: {
    width: 20,
    height: 20,
    margin: 5,
  },

});

export default class SchedulingVisit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appToken: this.props.counselor.token,
      nuvemCode: this.props.counselor.nuvemCode,
      visit: {
        codSchool: 32,
        date: '',
        time: '',
      },
    };
  }

  render() {
    console.log(this.props);
    return (
      <ScrollView style={styles.principal}>
        <Header
          title={'AGENDAR'}
          subTitle={'VISITA'}
        />
        <View style={styles.Container}>
          <View>
            <TouchableOpacity
              key="searchSchoolButton"
              style={styles.button}
              onPress={() => Actions.searchSchool()}
            >
              <Text style={styles.buttonText}>Pesquisar escola</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.props.school.schoolSelected && (
          <SchoolData {...this.props.school} />
        )}

        <View style={styles.Container}>
          <DatePicker
            style={styles.Picker}
            placeholder="Data"
            date={this.state.visit.date}
            mode="date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateInput: {
                borderRadius: 7,
              },
            }}
            onDateChange={date => this.setState({ visit: { ...this.state.visit, date } })}
          />
        </View>

        <View style={styles.Container}>
          <DatePicker
            style={styles.Picker}
            placeholder="Horário"
            date={this.state.visit.time}
            mode="time"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateInput: {
                borderRadius: 7,
              },
            }}
            onDateChange={time => this.setState({ visit: { ...this.state.visit, time } })}
          />
        </View>

        <View style={styles.Container}>
          <View>
            <TouchableOpacity
              key="searchCounselorButton"
              style={styles.button}
              onPress={() => Alert.alert('Pesquisando')}
            >
              <Text style={styles.buttonText}>Pesquisar Conselheiro</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.Container}>
          <View>
            <TouchableOpacity
              key="searchAgentButton"
              style={styles.button}
              onPress={() => Alert.alert('Pesquisando')}
            >
              <Text style={styles.buttonText}>Pesquisar Agente Sanitário</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Container}>
          <TouchableOpacity
            key="scheduleButton"
            style={styles.schedullingButton}
            onPress={() => this.props.asyncSchedulingVisit(this.state)}
          >
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}


const { shape, string, number } = PropTypes;

SchedulingVisit.propTypes = {
  asyncSchedulingVisit: PropTypes.func.isRequired,
  counselor: shape({
    token: string.isRequired,
    nuvemCode: number.isRequired,
  }).isRequired,
  school: shape({
    schoolCode: number.isRequired,
    schoolName: string.isRequired,
    schoolPhone: string.isRequired,
    schoolEmail: string.isRequired,
  }).isRequired,
};