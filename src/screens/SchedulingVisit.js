import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, BackHandler, ActivityIndicator, Alert } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';
import { EvilIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import SchoolData from '../components/SchoolData';
import EmailField from '../components/EmailField';
import InvitedCounselorsData from '../components/InvitedCounselorsData';
import Button from '../components/Button';
import * as constant from '../constants/sendAgentEmail';
import { backHandlerPopToMain } from '../NavigationFunctions';
import Header from '../components/Header';
import ShowToast from '../components/Toast';
import { NO_OTHER_COUNSELORS } from '../constants/generalConstants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },
  textLogo: {
    // Font size 30 looks nice on 360 width phone.
    // (x * widthYourPhone = fontSize) where x is the proportion used in fontSize above.
    fontSize: width * 0.08,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 60,
  },
  wrapper: {
    height: 100,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
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

  disabledSchedullingButton: {
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#DEDEDE',
    justifyContent: 'flex-end',
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
  icon_header: {
    marginLeft: 20,
  },
  Picker: {
    marginHorizontal: 15,
    width: '95%',
  },

  popUp: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },

  popUpText: {
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 20,
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
    height: 250,
    borderWidth: 1.5,
    padding: 1,
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

  TopListText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },

  invitedListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  InputFieldStyle: {
    marginHorizontal: 65,
    marginLeft: 30,
    marginRight: 30,
    paddingVertical: 8,
    marginTop: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },

});

export default class SchedulingVisit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appToken: this.props.counselor.token,
      nuvemCode: this.props.counselor.nuvemCode,
      codGrupoDestino: this.props.counselor.profile.codGroup,
      visit: {
        codSchool: this.props.school.schoolCode,
        schoolName: this.props.school.schoolName,
        date: '',
        time: '',
        invitedAgent: false,
        agentEmail: '',
        visitListOfInvitees: this.props.visitListOfInvitees,
      },
      verification: true,
      enabled: true,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  invitingAgent() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(this.state.visit.agentEmail)) {
      Alert.alert(
        'Email Incorreto!',
        'O email digitado é inválido! ',
        [
          { text: 'Ok', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: false });
    } else {
      this.setState({ visit: { ...this.state.visit, invitedAgent: true } });
      this.popupDialogAgent.dismiss();
    }
  }

  notInvitingAgent() {
    this.setState({ visit: { ...this.state.visit, invitedAgent: false } });
    this.setState({ visit: { ...this.state.visit, agentEmail: '' } });
    this.popupDialogAgent.dismiss();
  }

  showAgentEmail() {
    if (this.state.visit.agentEmail !== '') {
      return (
        <View>
          <Text style={styles.TopListText}>Agente Convidado</Text>
          <View style={styles.InputFieldStyle}>
            <Text>{this.state.visit.agentEmail}</Text>
          </View>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.TopListText}>Agente Convidado</Text>
        <View style={styles.InputFieldStyle}>
          <Text style={{ color: '#bababa' }}>Nenhum agente convidado</Text>
        </View>
      </View>
    );
  }

  manageInvitedListState(counselor) {
    const visitNewLists = {
      visitNewListWithInformations: this.props.visitListOfInviteesWithCounselorInformations,
      visitNewList: this.state.visit.visitListOfInvitees,
    };

    // If the counselor is not at the list (undefined),
    // we will add him to the list, where its key is the counselor's nuvemCode
    if (visitNewLists.visitNewListWithInformations[counselor.nuvemCode] === undefined) {
      visitNewLists.visitNewListWithInformations[counselor.nuvemCode] = counselor;

      visitNewLists.visitNewList[counselor.nuvemCode] = {
        nuvemCode: counselor.nuvemCode,
        confirmed: false,
        realizedVisit: false,
      };
      this.props.setVisitNewLists(visitNewLists);
    } else {
      delete visitNewLists.visitNewListWithInformations[counselor.nuvemCode];
      delete visitNewLists.visitNewList[counselor.nuvemCode];

      this.props.setVisitNewLists(visitNewLists);
    }

    this.forceUpdate();
  }

  changeStyleAccordingToInput(counselor) {
    if
    (this.props.visitListOfInviteesWithCounselorInformations[counselor.nuvemCode] !== undefined) {
      return [styles.listRegisters, { borderColor: '#FF9500' }];
    }
    return styles.listRegisters;
  }

  cancelInviteList() {
    const visitNewLists = {
      visitNewListWithInformations: {},
      visitNewList: {},
    };

    this.props.setVisitNewLists(visitNewLists);

    this.popupDialogCounselor.dismiss();
  }

  deleteSpecificCounselor(counselorNuvemCode) {
    const visitNewLists = {
      visitNewListWithInformations: this.props.visitListOfInviteesWithCounselorInformations,
      visitNewList: this.state.visit.visitListOfInvitees,
    };

    delete visitNewLists.visitNewListWithInformations[counselorNuvemCode];
    delete visitNewLists.visitNewList[counselorNuvemCode];

    this.props.setVisitNewLists(visitNewLists);

    this.forceUpdate();
  }

  showInvitedList() {
    // Check if the Object is empty
    if (Object.keys(this.props.visitListOfInviteesWithCounselorInformations)
      .length !== 0) {
      return (
        <View>
          <Text style={styles.TopListText}>Lista de conselheiros convidados</Text>
          <View style={styles.invitedList}>
            <ScrollView
              /* This make the nested ScrollView works. */
              onTouchStart={() => this.setState({ enabled: false })}
              onTouchEnd={() => this.setState({ enabled: true })}
              onScrollBeginDrag={() => this.setState({ enabled: false })}
              onScrollEndDrag={() => this.setState({ enabled: true })}
            >
              {
                Object.entries(this.props.visitListOfInviteesWithCounselorInformations)
                  .map(counselor => (
                    <View style={styles.invitedListStyle} key={counselor[0]}>
                      <InvitedCounselorsData
                        key={counselor[0]}
                        {...counselor[1]}
                      />
                      <TouchableOpacity
                        onPress={() => this.deleteSpecificCounselor(counselor[0])}
                      >
                        <EvilIcons name="close" style={styles.icon} size={26} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))
              }
            </ScrollView>
          </View>
        </View>
      );
    }
    return null;
  }

  renderCounselorList() {
    if (this.props.application === true) {
      return (
        <ActivityIndicator style={{ marginTop: 50, justifyContent: 'center' }} size="large" color="#FF9500" />
      );
    }
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
                {counselor.profile.cpf}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Telefone: </Text>
                {counselor.profile.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  }
  render() {
    return (
      <View style={styles.principal}>
        <Header
          title={'Agendar Visita'}
          onPress={() => Actions.popTo('mainScreen')}
        />
        <PopupDialog
          ref={(popupDialogAgent) => { this.popupDialogAgent = popupDialogAgent; }}
          height="45%"
          width="90%"
          dialogTitle={<DialogTitle
            title="Convidar um Agente?"
          />}
          actions={[
            <View style={styles.footerPopUp}>
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                enabled
                key="invitingButton"
                text="Convidar"
                onPress={() => { this.invitingAgent(); }}
              />

              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                enabled
                key="notInvitingButton"
                text="Cancelar"
                onPress={() => { this.notInvitingAgent(); }}
              />
            </View>,
          ]}
        >
          <View style={styles.popUp}>
            <Text style={styles.popUpText}>{constant.POPUP_MESSAGE}</Text>

            <EmailField
              callback={emailInput => this.setState(
                { visit: { ...this.state.visit, agentEmail: emailInput } })}
              placeholder="Email"
              onSubmitEditing={() => this.setState({ focus: true })}
              value={this.state.email}
              size={28}
            />

          </View>
        </PopupDialog>

        <PopupDialog
          ref={(popupDialogCounselor) => {
            this.popupDialogCounselor = popupDialogCounselor;
          }}
          dialogTitle={<DialogTitle title="Escolha quem deseja convidar" />}
          overlayPointerEvents="none"
          height="80%"
          width="85%"
          actions={[
            <View style={styles.footerPopUp} key="buttonsDialog">
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="CONVIDAR"
                onPress={() => this.popupDialogCounselor.dismiss()}
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

        <ScrollView
          /* This make the nested ScrollView works. */
          scrollEnabled={this.state.enabled}
        >

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
                onPress={() => {
                  if (this.props.listOfCounselorsInAGroup.length === 0) {
                    ShowToast.Toast(NO_OTHER_COUNSELORS);
                  } else {
                    this.popupDialogCounselor.show();
                  }
                }}
              >
                <Text style={styles.buttonText}>Adicionar Conselheiro</Text>
              </TouchableOpacity>
            </View>

            {this.showInvitedList()}

            <View style={styles.Container}>
              <TouchableOpacity
                key="searchAgentButton"
                style={styles.button}
                onPress={() => this.popupDialogAgent.show()}
              >
                <Text style={styles.buttonText}>Convidar Agente</Text>
              </TouchableOpacity>
            </View>

            {this.showAgentEmail()}

            <View>
              {this.props.school.schoolSelected &&
                this.state.visit.date !== '' && this.state.visit.time !== '' && (
                  <Button
                    enabled
                    key="scheduleButton"
                    text="Agendar"
                    onPress={() => this.props.asyncSchedulingVisit(this.state,
                      this.props.counselor)}
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


const { shape, string, number, func } = PropTypes;

SchedulingVisit.propTypes = {
  asyncSchedulingVisit: func.isRequired,
  asyncGetCounselorFromGroup: func.isRequired,
  setVisitNewLists: func.isRequired,
  application: PropTypes.bool.isRequired,
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
  visitListOfInviteesWithCounselorInformations: shape({
  }).isRequired,
  visitListOfInvitees: shape({
  }).isRequired,
};
