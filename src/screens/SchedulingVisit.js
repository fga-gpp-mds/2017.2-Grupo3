import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
import SchoolData from '../components/SchoolData';
import InvitedCounselorsData from '../components/InvitedCounselorsData';
import Button from '../components/Button';


const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  button: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  Container: {
    marginTop: 15,
    marginHorizontal: 20,
  },

  Picker: {
    width: null,
  },

  textBox: {
    margin: 1.5,
    paddingLeft: 2,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 15,
    paddingVertical: 3,
  },

  listRegisters: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 7,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },

  invitedList: {
    borderColor: 'black',
    borderWidth: 1.5,
    marginHorizontal: 20,
    borderRadius: 5,
  },

  dialogButtonStyle: {
    marginVertical: -16,
  },

  footerPopUp: {
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default class SchedulingVisit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appToken: this.props.counselor.token,
      nuvemCode: this.props.counselor.nuvemCode,
      visit: {
        codSchool: 0,
        date: '',
        time: '',
        listOfInvitees: this.props.listOfInvitees,
      },
    };
  }

  componentWillMount() {
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  componentWillReceiveProps(newProps) {
    const newVisit = {
      codSchool: newProps.school.schoolCode,
      date: this.state.visit.date,
      time: this.state.visit.time,
      listOfInvitees: newProps.listOfInvitees,
    };

    this.setState({ visit: newVisit });
  }

  manageInvitedListState(counselor) {
    const newLists = {
      newListWithInformations: this.props.listOfInviteesWithCounselorInformations,
      newList: this.state.visit.listOfInvitees,
    };

    // If the counselor is not at the list (undefined),
    // we will add him to the list, where its key is the counselor's nuvemCode
    if (newLists.newListWithInformations[counselor.nuvemCode] === undefined) {
      newLists.newListWithInformations[counselor.nuvemCode] = counselor;

      newLists.newList[counselor.nuvemCode] = {
        nuvemCode: counselor.nuvemCode,
        confirmed: false,
      };
      this.props.setNewLists(newLists);
    } else {
      delete newLists.newListWithInformations[counselor.nuvemCode];
      delete newLists.newList[counselor.nuvemCode];

      this.props.setNewLists(newLists);
    }

    this.forceUpdate();
  }

  changeStyleAccordingToInput(counselor) {
    if (this.props.listOfInviteesWithCounselorInformations[counselor.nuvemCode] !== undefined) {
      return [styles.listRegisters, { borderColor: '#FF9500' }];
    }
    return styles.listRegisters;
  }

  cancelInviteList() {
    const newLists = {
      newListWithInformations: {},
      newList: {},
    };

    this.props.setNewLists(newLists);

    this.popupDialog.dismiss();
  }

  showInvitedList() {
    // Check if the Object is empty
    if (Object.keys(this.props.listOfInviteesWithCounselorInformations)
      .length !== 0) {
      return (
        <View>
          <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Lista de conselheiros convidados</Text>
          <View style={styles.invitedList}>
            {
              Object.entries(this.props.listOfInviteesWithCounselorInformations)
                .map(counselor => (
                  <InvitedCounselorsData
                    key={counselor[0]}
                    {...counselor[1]}
                  />
                ))
            }
          </View>
        </View>
      );
    }
    return null;
  }

  renderCounselorList() {
    return (
      this.props.listOfCounselorsInAGroup.map(counselor => (
        <View style={this.changeStyleAccordingToInput(counselor)} key={counselor.nuvemCode}>
          <TouchableOpacity
            onPress={() => this.manageInvitedListState(counselor)}
          >
            <View style={styles.textBox}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
                {counselor.name}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>CPF: </Text>
                {counselor.cpf}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Telefone: </Text>
                {counselor.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  }

  render() {
    console.log(this.state.visit.listOfInvitees);
    return (
      <View style={styles.principal}>
        <Header
          title={'AGENDAR'}
          subTitle={'VISITA'}
          backButton
        />
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogTitle={<DialogTitle title="Escolha quem deseja convidar" />}
          overlayPointerEvents="none"
          height="80%"
          width="85%"
          actions={[
            <View style={styles.footerPopUp}>
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="ACEITAR"
                onPress={() => this.popupDialog.dismiss()}
                key="dialogButton1"
              />
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="CANCELAR"
                onPress={() => this.cancelInviteList()}
                key="dialogButton2"
              />
            </View>,
          ]}
        >
          <ScrollView key="showInviteCounselorList">
            {this.renderCounselorList()}
          </ScrollView>
        </PopupDialog>

        <ScrollView>
          <View>
            <View style={styles.Container}>
              <TouchableOpacity
                key="searchSchoolButton"
                style={styles.button}
                onPress={() => Actions.searchSchool()}
              >
                <Text style={styles.buttonText}>Pesquisar escola</Text>
              </TouchableOpacity>
            </View>

            {this.props.school.schoolSelected && (
              <SchoolData {...this.props.school} />
            )}

            <View style={[styles.Container, { marginVertical: 10 }]}>
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
              <TouchableOpacity
                key="searchCounselorButton"
                style={styles.button}
                onPress={() => this.popupDialog.show()}
              >
                <Text style={styles.buttonText}>Pesquisar Conselheiro</Text>
              </TouchableOpacity>
            </View>

            {this.showInvitedList()}

            <View style={styles.Container}>
              <TouchableOpacity
                key="searchAgentButton"
                style={styles.button}
                onPress={() => Alert.alert('Pesquisando')}
              >
                <Text style={styles.buttonText}>Pesquisar Agente Sanitário</Text>
              </TouchableOpacity>
            </View>

            <View>
              {this.props.school.schoolSelected && (
                <Button
                  enabled
                  key="scheduleButton"
                  text="Agendar"
                  onPress={() => { this.props.asyncSchedulingVisit(this.state); }}
                />
              )}

              <Button
                enabled={false}
                text="Agendar"
                key="scheduleButton"
                onPress={() => ({})}
                disabled
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const { shape, string, number, bool, func } = PropTypes;

SchedulingVisit.propTypes = {
  asyncSchedulingVisit: func.isRequired,
  asyncGetCounselorFromGroup: func.isRequired,
  setNewLists: func.isRequired,
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
  listOfCounselorsInAGroup: PropTypes.arrayOf(PropTypes.shape({
    name: string.isRequired,
    cpf: string.isRequired,
    phone: string.isRequired,
  })).isRequired,
  listOfInviteesWithCounselorInformations: shape({
    nuvemCode: number.isRequired,
    name: string.isRequired,
    cpf: string.isRequired,
    phone: string.isRequired,
  }).isRequired,
  listOfInvitees: shape({
    nuvemCode: number.isRequired,
    confirmed: bool.isRequired,
  }).isRequired,
};
