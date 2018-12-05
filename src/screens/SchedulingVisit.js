import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, TouchableOpacity, ScrollView, BackHandler,
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import SchoolData from '../components/SchoolData';
import EmailField from '../components/EmailField';
import Button from '../components/Button';
import * as constant from '../constants/sendAgentEmail';
import { backHandlerPopToMain } from '../NavigationFunctions';
import Header from '../components/Header';
import ShowToast from '../components/Toast';
import { NO_OTHER_COUNSELORS } from '../constants/toastMessages';
import styles from '../Styles/SchedulingVisitStyles';
import InviteAgent from '../components/InviteAgent';

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
    this.InviteAgentObject = new InviteAgent(props);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  render() {
    return (
      <View style={styles.principal}>
        <Header
          title="Agendar Visita"
          onPress={() => Actions.popTo('mainScreen')}
        />
        <PopupDialog
          ref={(popupDialogAgent) => { this.popupDialogAgent = popupDialogAgent; }}
          height="45%"
          width="90%"
          dialogTitle={(
            <DialogTitle
              title="Convidar um Agente?"
            />
)}
          actions={[
            <View style={styles.footerPopUp}>
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                enabled
                key="invitingButton"
                text="Convidar"
                onPress={() => { this.InviteAgentObject.invitingAgent(this.popupDialogAgent); }}
              />

              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                enabled
                key="notInvitingButton"
                text="Cancelar"
                onPress={() => { this.InviteAgentObject.notInvitingAgent(this.popupDialogAgent); }}
              />
            </View>,
          ]}
        >
          <View style={styles.popUp}>
            <Text style={styles.popUpText}>{constant.POPUP_MESSAGE}</Text>

            <EmailField
              callback={emailInput => this.setState(
                { visit: { ...this.state.visit, agentEmail: emailInput } },
              )}
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
                onPress={() => this.InviteAgentObject.cancelInviteList(this.popupDialogCounselor)}
                key="dialogButton2"
              />
            </View>,
          ]}
        >

          <ScrollView key="showInviteCounselorList">
            {this.InviteAgentObject.renderCounselorList()}
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

            {this.InviteAgentObject.showInvitedList()}

            <View style={styles.Container}>
              <TouchableOpacity
                key="searchAgentButton"
                style={styles.button}
                onPress={() => this.popupDialogAgent.show()}
              >
                <Text style={styles.buttonText}>Convidar Agente</Text>
              </TouchableOpacity>
            </View>

            {this.InviteAgentObject.showAgentEmail()}

            <View>
              {this.props.school.schoolSelected
                && this.state.visit.date !== '' && this.state.visit.time !== '' && (
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


const {
  shape, string, number, func,
} = PropTypes;

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
