import React from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { logInfo } from '../../logConfig/loggers';

const FILE_NAME = 'VisitCard';

const styles = StyleSheet.create({
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
    marginRight: 15,
    justifyContent: 'center',
    marginVertical: 5,
  },

  buttonInvitees: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginVertical: 5,
  },

  buttonText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export const ConfirmAndCancelButtons = props => (
  <View style={props.style}>
    <TouchableOpacity
      onPress={() => {
        props.buttonCallBack();
      }}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  </View>
);

export const MoreInfoCard = props => (
  <View style={styles.buttonInvitees}>
    <TouchableOpacity
      onPress={() => props.infoCardCallBack()}
      key="+InfoButton"
    >
      <Text style={styles.buttonText}> + INFORMAÇÕES</Text>
    </TouchableOpacity>
  </View>
);

class VisitCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visit: {},
      text: 'Agendamento',
      counselor: this.props.counselor,
    };
  }

  async buttonCallBack(value) {
    const getData = {
      appToken: this.props.counselor.token,
      codConteudoPost: this.props.visit.codConteudoPost,
      codPostagem: this.props.visit.codPostagem,
    };


    logInfo(FILE_NAME, 'buttonCallBack', `GetData sent to asyncGetCurrentSchedule: ${JSON.stringify(getData)}`);

    await this.props.asyncGetCurrentSchedule(getData);
    const updatedVisit = this.props.currentSchedule;
    updatedVisit.content.visitListOfInvitees[this.props.counselor.nuvemCode]
      .confirmed = value;

    const postData = {
      content: { ...updatedVisit.content },
      codConteudoPost: this.props.visit.codConteudoPost,
      codPostagem: this.props.visit.codPostagem,
    };

    await this.props.asyncUpdateSchedule(postData);
    await this.props.asyncGetSchedule(this.props.counselor);
  }

  render() {
    let confirmOrCancelButton = null;

    // If the counselor is confirmed, show cancel button.
    // If the counselor isn't confirmed, show confirm button.
    if (this.props.visit.content.visitListOfInvitees[this.props.counselor.nuvemCode].confirmed) {
      confirmOrCancelButton = (
        <ConfirmAndCancelButtons
          text="CANCELAR PRESENÇA"
          buttonCallBack={() => this.buttonCallBack(false)}
          style={[styles.buttonBox, { backgroundColor: 'red' }]}
          key="CancelPresenceButton"
        />
      );
    } else {
      confirmOrCancelButton = (
        <ConfirmAndCancelButtons
          text="CONFIRMAR PRESENÇA"
          buttonCallBack={() => this.buttonCallBack(true)}
          style={styles.buttonBox}
          key="confirmPresenceButton"
        />
      );
    }

    return (
      <View style={styles.listSchedule}>
        <View style={styles.textBox}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Escola: </Text>
            {this.props.visit.content.schoolName}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Data: </Text>
            {this.props.visit.content.date}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Horário: </Text>
            {this.props.visit.content.time}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          {confirmOrCancelButton}
          <MoreInfoCard
            infoCardCallBack={() => this.props.popUpCallBack(this.props.visit)}
          />
        </View>
      </View>
    );
  }
}

VisitCard.propTypes = {
  asyncUpdateSchedule: PropTypes.func.isRequired,
  asyncGetCurrentSchedule: PropTypes.func.isRequired,
  asyncGetSchedule: PropTypes.func.isRequired,
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
  }).isRequired,
  visit: PropTypes.shape({
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
  }).isRequired,
  counselor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    nuvemCode: PropTypes.number.isRequired,
    profile: PropTypes.shape({
      cpf: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      isPresident: PropTypes.bool.isRequired,
      segment: PropTypes.string.isRequired,
      CAE: PropTypes.string.isRequired,
      CAE_Type: PropTypes.string,
    }).isRequired,
  }).isRequired,
  popUpCallBack: PropTypes.func.isRequired,
};

ConfirmAndCancelButtons.propTypes = {
  buttonCallBack: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
};

MoreInfoCard.propTypes = {
  infoCardCallBack: PropTypes.func.isRequired,
};

export default VisitCard;
