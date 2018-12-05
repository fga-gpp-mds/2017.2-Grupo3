import React from 'react';
import {
  Text,
  View,
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
import stylesList from '../Styles/ListStyles';
import { getCounselorDataWithEmail } from '../services/extractDataCounselor';
import ScheduleCard from '../components/ScheduleCard';
import getMeetingData from '../services/extractDataMeeting';
import Button from '../components/Button';
import { styles, buttonBoxStyle } from '../Styles/MeetingInvitesStyles';

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
    } if (this.props.listOfScheduleMeetingInAGroup.length === 0) {
      return (
        <View style={stylesList.noneScheduleTextBox}>
          <Text style={stylesList.noneScheduleText}>Nenhuma Reunião Pendente!</Text>
        </View>
      );
    }
    return (
      this.props.listOfScheduleMeetingInAGroup.map(meetingSchedule => (
        <ScheduleCard
          data={getMeetingData(meetingSchedule.content)}
          keyProp={meetingSchedule.nuvemCode}
        >
          <View style={{ flex: 3 }}>
            <Button
              style={buttonBoxStyle}
              enabled
              text="+ INFORMAÇÕES"
              key="+MeetingInfo"
              onPress={() => this.getInfo(meetingSchedule.content)}
            />
          </View>
        </ScheduleCard>
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
          {
            getCounselorDataWithEmail(counselor).map(item => (
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
                {item.value}
              </Text>
            ))
          }
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
          title="Notificações"
          subTitle="Reunião"
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
                {
                  getMeetingData(this.state.meetingSchedule).map(item => (
                    <Text style={styles.text}>
                      <Text style={{ fontWeight: 'bold' }}>
                        {item.label}
                        {' '}
                      </Text>
                      {item.value}
                    </Text>
                  ))
                }
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
