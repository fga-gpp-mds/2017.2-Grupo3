import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';
import Header from '../components/Header';
import LocalizationMapButton from '../components/LocalizationMapButton';
import { backHandlerPop } from '../NavigationFunctions';

const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingTop: 6,
    backgroundColor: 'white',
  },

  listScheduleMeeting: {
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
    marginTop: 5,
    paddingLeft: 4,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 15,
    paddingVertical: 2,
  },

  buttonInformation: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    marginRight: 20,
    marginTop: 5,
    width: 120,
  },

  buttonText: {
    fontSize: 12,
    textAlign: 'center',
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
  buttonMap: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },
});

class MeetingInvites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitees: [],
      meetingSchedule: {
        date: '',
        time: '',
        meetingListOfInvitees: [{
        }],
      },
      meetingLat: null,
      meetingLong: null,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentDidMount() {
    this.props.asyncGetScheduleMeeting(this.props.counselor);
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }

  async getMeetingLocalization() {
    await this.setState({ meetingLat: this.state.meetingSchedule.lat });
    await this.setState({ meetingLong: this.state.meetingSchedule.long });
    this.popupDialog.show();
  }

  async getInfo(meetingSchedule) {
    await this.setState({ meetingSchedule });
    await this.mountListOfInvitees(this.state.meetingSchedule.meetingListOfInvitees);
    await this.getMeetingLocalization();
  }

  arrayScheduleMeetingList() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FF9500" />
      );
    } else if (this.props.listOfScheduleMeetingInAGroup.length === 0) {
      return (
        <View style={styles.noneScheduleTextBox}>
          <Text style={styles.noneScheduleText}>Nenhuma Reunião Pendente!</Text>
        </View>
      );
    }
    return (
      this.props.listOfScheduleMeetingInAGroup.map(meetingSchedule => (
        <View style={styles.listScheduleMeeting}>
          <View style={styles.textBox}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Data: </Text>
              {meetingSchedule.content.date}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Horário: </Text>
              {meetingSchedule.content.time}
            </Text>
          </View>
          <View style={styles.buttonInformation}>
            <TouchableOpacity
              onPress={() => this.getInfo(meetingSchedule.content)}
              key="+MeetingInfo"
            >
              <Text style={styles.buttonText}> + INFORMAÇÕES</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
    );
  }

  async mountListOfInvitees(meetingListOfInvitees) {
    const list = [];
    await this.setState({ invitees: [] });
    // Do a map of the list of Counselors of CAE
    this.props.listOfCounselorsInAGroup.map((counselor) => {
      /* If the Counselor of CAE is in the guest list it will be added to a
      list with his information. The session Counselor will not
      be shown because it is not placed in listOfCounselorsInAGroup */
      if (meetingListOfInvitees[counselor.nuvemCode] !== undefined) {
        list.push(counselor);
        this.setState({ invitees: list });
      }

      return null;
    });
  }

  verificationDescription() {
    if (this.state.meetingSchedule.meetingDescription !== '') {
      return (
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Descrição da reunião: </Text>
          {this.state.meetingSchedule.meetingDescription}
        </Text>
      );
    }
    return null;
  }

  renderCounselorList() {
    return (
      this.state.invitees.map(counselor => (
        <View style={styles.listRegisters} key={counselor.nuvemCode}>
          <View style={styles.textBox}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
              {counselor.name}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>E-mail: </Text>
              {counselor.email}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Telefone: </Text>
              {counselor.profile.phone}
            </Text>
          </View>
        </View>
      ))
    );
  }


  render() {
    let localizationButton = null;
    if (this.state.meetingLat !== null && this.state.meetingLong !== null) {
      localizationButton = (
        <LocalizationMapButton
          Latitude={this.state.meetingLat}
          Longitude={this.state.meetingLong}
        />
      );
    }

    return (
      <View style={styles.principal}>
        <Header
          title={'Notificações'}
          subTitle={'Reunião'}
        />
        <PopupDialog
          /* Popup para mostrar as informações da reunião */
          ref={(popupDialog) => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="Informações sobre a reunião" />}
          overlayPointerEvents="none"
          height="60%"
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
          <ScrollView>
            <View style={styles.listScheduleMeeting}>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>Data: </Text>
                  {this.state.meetingSchedule.date}
                </Text>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>Horário: </Text>
                  {this.state.meetingSchedule.time}
                </Text>
                {this.verificationDescription()}
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>Número de convidados: </Text>
                  {Object.keys(this.state.meetingSchedule.meetingListOfInvitees).length}
                </Text>
                {localizationButton}
                <View>
                  <Text style={{ color: '#95a5a6', fontSize: 20 }}>Convidados:</Text>
                </View>
                {this.renderCounselorList()}
              </View>
            </View>
          </ScrollView>
        </PopupDialog>
        <ScrollView style={styles.content}>
          {this.arrayScheduleMeetingList()}
        </ScrollView>
      </View>
    );
  }
}

const { shape, func } = PropTypes;

MeetingInvites.propTypes = {
  asyncGetCounselorFromGroup: func.isRequired,
  asyncGetScheduleMeeting: func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  listOfCounselorsInAGroup: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
  })).isRequired,
  listOfScheduleMeetingInAGroup: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  })).isRequired,
  counselor: shape({
  }).isRequired,
};

export default MeetingInvites;
