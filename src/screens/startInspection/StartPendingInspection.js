import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';

import stylesList from '../../Styles/ListStyles';
import ScheduleCard from '../../components/ScheduleCard';
import Button from '../../components/Button';
import { getVisitData, getCounselorData } from '../../services/extractDataInspection';


const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingTop: 6,
    backgroundColor: 'white',
  },

  listSchedule: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textBox: {
    flex: 4,
    paddingLeft: 4,
    justifyContent: 'flex-start',
    marginRight: 15,
  },

  text: {
    fontSize: 15,
    paddingVertical: 2,
  },

  buttonBox: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#4cd964',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  buttonInvitees: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  buttonText: {
    fontSize: 12,
    textAlign: 'center',
  },

  popUp: {
    marginBottom: 120,
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

  listRegisters: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 7,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },
});


const buttonInviteesStyle = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

const buttonBoxStyle = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#4cd964',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

const buttonBoxStyleNotInvitee = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#ff3b30',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

const buttonBoxStyleNotConfirm = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#ffcc00',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

class StartPendingInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitees: [],
    };
  }

  componentDidMount() {
    this.props.resetStore('report');
    this.props.asyncGetSchedule(this.props.counselor);
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  arrayScheduleList() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FF9500" />
      );
    } else if (this.props.listOfPendingScheduleInAGroup.length === 0) {
      return (
        <View style={stylesList.noneScheduleTextBox}>
          <Text style={stylesList.noneScheduleText}>Nenhum Agendamento Pendente!</Text>
        </View>
      );
    }

    return (
      this.props.listOfPendingScheduleInAGroup.map(visitSchedule => (
        <ScheduleCard
          data={getVisitData(visitSchedule)}
          keyProp={`PE${visitSchedule.codPostagem}`}
        >
          <View style={{ flex: 3 }}>
            {this.verification(visitSchedule.content.visitListOfInvitees, visitSchedule)}
            {
              this.renderPaticipantsButton(
                visitSchedule,
                Object.keys(visitSchedule.content.visitListOfInvitees).length)
            }
          </View>
        </ScheduleCard>
      ))
    );
  }

  verification(visitListOfInvitees, visitSchedule) {
    if (visitListOfInvitees[this.props.counselor.nuvemCode] === undefined) {
      return (
        <Button
          style={buttonBoxStyleNotInvitee}
          enabled={false}
          text="NÃO CONVIDADO"
          onPress={() => { }}
        />
      );
    } else if (!visitListOfInvitees[this.props.counselor.nuvemCode].confirmed) {
      return (
        <Button
          style={buttonBoxStyleNotConfirm}
          enabled={false}
          text="NÃO CONFIRMOU"
          onPress={() => { }}
        />
      );
    }
    return (
      <Button
        style={buttonBoxStyle}
        enabled
        text="FISCALIZAR"
        onPress={() => {
          this.props.setCurrentInspection(visitSchedule);
          Actions.mainReportsScreen();
        }}
      />

    );
  }

  mountvisitListOfInvitees(visitListOfInvitees) {
    const list = [];
    this.setState({ invitees: [] });
    // Faz um map da list de conselheiros do CAE
    this.props.listOfCounselorsInAGroup.map((counselor) => {
      /* caso o conselheiro do CAE esteja na lista de convidados
      ele será adicionado numa lista com suas informações
      O conselheiro da sessão não será mostrado por que ele não é colocado em
      listOfCounselorsInAGroup */
      if (visitListOfInvitees[counselor.nuvemCode] !== undefined) {
        const completeCounselor = {
          ...counselor,
          confirmed: visitListOfInvitees[counselor.nuvemCode].confirmed,
          realizedVisit: visitListOfInvitees[counselor.nuvemCode].realizedVisit,
        };
        list.push(completeCounselor);
        return this.setState({ invitees: list });
      }
      return null;
    });
    this.popupDialog.show();
  }

  renderPaticipantsButton(visitSchedule, numberOfParticipants) {
    let participantsButton;
    if (numberOfParticipants > 1 ||
      !visitSchedule.content.visitListOfInvitees[this.props.counselor.nuvemCode] !== undefined) {
      participantsButton = (
        <Button
          style={buttonInviteesStyle}
          text="PARTICIPANTES"
          enabled
          onPress={() =>
            this.mountvisitListOfInvitees(visitSchedule.content.visitListOfInvitees)}
        />
      );
    }
    return participantsButton;
  }

  renderCounselorList() {
    return (
      this.state.invitees.map(counselor => (
        <ScheduleCard
          data={getCounselorData(counselor)}
          keyProp={`${counselor.nuvemCode}`}
        />
      ))
    );
  }

  render() {
    return (
      <View style={styles.principal}>
        <PopupDialog
          /* Popup para mostrar a lista de convidados */
          ref={(popupDialog) => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="Convidados" />}
          dialogStyle={styles.popUp}
          overlayPointerEvents="none"
          height="70%"
          width="85%"
          actions={[
            <View style={styles.footerPopUp}>
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="OK"
                onPress={() => this.popupDialog.dismiss()}
                key="dialogButton1"
              />
            </View>,
          ]}
        >
          <ScrollView key="showInviteCounselorList">
            {this.renderCounselorList()}
          </ScrollView>
        </PopupDialog>

        <ScrollView style={styles.content}>
          {this.arrayScheduleList()}
        </ScrollView>
      </View>
    );
  }
}

const { shape, func } = PropTypes;

StartPendingInspection.propTypes = {
  resetStore: func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  asyncGetCounselorFromGroup: func.isRequired,
  asyncGetSchedule: func.isRequired,
  setCurrentInspection: func.isRequired,
  listOfPendingScheduleInAGroup: PropTypes.arrayOf(PropTypes.shape({
    codSchool: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
  })).isRequired,
  counselor: shape({
  }).isRequired,
  listOfCounselorsInAGroup: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
  })).isRequired,
};

export default StartPendingInspection;
