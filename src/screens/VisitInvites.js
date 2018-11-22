import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { View, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import VisitCard from '../components/VisitCard';
import Header from '../components/Header';
import VisitInfoPopUp from '../components/VisitInfoPopUp';
import { UNABLE_TO_FIND_SCHOOL } from '../constants/generalConstants';
import { SCHOOL_ENDPOINT } from '../constants/linkConstants';
import { logInfo, logWarn } from '../../logConfig/loggers';
import ShowToast from '../components/Toast';
import { backHandlerPop } from '../NavigationFunctions';
import styles from '../Styles/VisitInvistesStyles'

const FILE_NAME = 'VisitInvites';

class VisitInvites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visit: {
        content: {
          agentEmail: '',
          codSchool: 0,
          date: '',
          invitedAgent: false,
          visitListOfInvitees: {},
          schoolName: '',
          time: '',
        },
        visitLat: 0,
        visitLong: 0,
      },
    };
  }

  /* When the screen is Mounting, asynchronously calls for
    the list of all visits for which our logged counselor was
    invited.
  */
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);

    this.props.asyncGetSchedule(this.props.counselor);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }


  async getLocalization() {
    try {
      const response = await
      axios.get(`${SCHOOL_ENDPOINT}/${this.state.visit.content.codSchool}`, {
        params: {
          campos: 'latitude,longitude',
        },
      });

      logInfo(FILE_NAME, 'getSchoolLocalization in visits Notifications',
        `Successfully got school data: ${JSON.stringify(response.data, null, 2)}`);

      // Since we get the response in portuguese, we need to "translate" it so we
      // can add it in the store.

      await this.setState({
        visit: {
          ...this.state.visit,
          visitLat: response.data.latitude,
          visitLong: response.data.longitude,
        },
      });
    } catch (error) {
      logWarn(FILE_NAME, 'getSchoolLocalization in visits Notifications', error);
      ShowToast.Toast(UNABLE_TO_FIND_SCHOOL);
    }
  }

  render() {
    let activityIndicatorOrCard = null;

    if (this.props.application === true) {
      activityIndicatorOrCard = (
        <ActivityIndicator
          style={{ marginTop: 50, justifyContent: 'center' }}
          size="large"
          color="#FF9500"
        />
      );
    } else {
      activityIndicatorOrCard = this.props.listOfPendingInvitedScheduleList.map(visit => (
        <VisitCard
          visit={visit}
          counselor={this.props.counselor}
          popUpCallBack={async (selectedVisit) => {
            await this.setState({ visit: selectedVisit });
            await this.getLocalization();
            this.popupDialog.show();
          }}
          key={visit.codConteudoPost}
          asyncUpdateSchedule={this.props.asyncUpdateSchedule}
          asyncGetCurrentSchedule={this.props.asyncGetCurrentSchedule}
          currentSchedule={this.props.currentSchedule}
          asyncGetSchedule={this.props.asyncGetSchedule}
        />
      ));
    }

    return (
      <View style={styles.principal}>
        <Header
          title={'Notificações'}
          subTitle={'Visita'}
        />
        <PopupDialog
          /* Popup para mostrar as informações da visita */
          ref={(popupDialog) => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="Informações sobre a visita" />}
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
          <VisitInfoPopUp visit={this.state.visit} />
        </PopupDialog>
        <ScrollView style={styles.content}>
          {activityIndicatorOrCard}
        </ScrollView>
      </View>
    );
  }
}

VisitInvites.propTypes = {
  asyncGetSchedule: PropTypes.func.isRequired,
  asyncUpdateSchedule: PropTypes.func.isRequired,
  asyncGetCurrentSchedule: PropTypes.func.isRequired,
  currentSchedule: PropTypes.shape({
    codConteudoPost: PropTypes.number.isRequired,
    codPostagem: PropTypes.number.isRequired,
    content: {
      agentEmail: PropTypes.string.isRequired,
      codSchool: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      invitedAgent: PropTypes.bool.isRequired,
      schoolName: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      visitListOfInvitees: PropTypes.shape({}),
    },
  }),
  counselor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    nuvemCode: PropTypes.number.isRequired,
  }).isRequired,
  application: PropTypes.bool.isRequired,
  listOfPendingInvitedScheduleList: PropTypes.shape([]).isRequired,
};

VisitInvites.defaultProps = {
  currentSchedule: PropTypes.shape({
    codConteudoPost: 0,
    codPostagem: 0,
    content: {
      agentEmail: 'email@email.com',
      codSchool: 0,
      date: '0-0-0000',
      invitedAgent: false,
      schoolName: 'Nome da escola',
      time: '00:00',
      visitListOfInvitees: PropTypes.shape({}),
    },
  }),
};

export default VisitInvites;
