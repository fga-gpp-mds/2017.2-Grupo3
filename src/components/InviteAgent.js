import EvilIcons from 'react-native-vector-icons/EvilIcons';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import InvitedCounselorsData from './InvitedCounselorsData';
import styles from '../Styles/SchedulingVisitStyles';
import ShowEmail from './ShowEmail';
import { LabeledField } from './LabeledField';

class InviteAgent extends React.Component {
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

  invitingAgent(popupDialogAgent) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(this.state.visit.agentEmail)) {
      Alert.alert(
        'Email Incorreto!',
        'O email digitado é inválido! ',
        [
          { text: 'Ok', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: false },
      );
    } else {
      this.setState({ visit: { ...this.state.visit, invitedAgent: true } });
      popupDialogAgent.dismiss();
    }
  }

  notInvitingAgent(popupDialogAgent) {
    this.setState({ visit: { ...this.state.visit, invitedAgent: false } });
    this.setState({ visit: { ...this.state.visit, agentEmail: '' } });
    popupDialogAgent.dismiss();
  }

  showAgentEmail() {
    // if (this.state.visit.agentEmail !== '') {
    //   return (
    //     <View>
    //       <Text style={styles.TopListText}>Agente Convidado</Text>
    //       <View style={styles.InputFieldStyle}>
    //         <Text>{this.state.visit.agentEmail}</Text>
    //       </View>
    //     </View>
    //   );
    // }
    // return (
    //   <View>
    //     <Text style={styles.TopListText}>Agente Convidado</Text>
    //     <View style={styles.InputFieldStyle}>
    //       <Text style={styles.NoInvitedAgent}>Nenhum agente convidado</Text>
    //     </View>
    //   </View>
    // );
    return (
      <ShowEmail
        agentEmail={this.state.agentEmail}
      />
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

  cancelInviteList(popupDialogCounselor) {
    const visitNewLists = {
      visitNewListWithInformations: {},
      visitNewList: {},
    };

    this.props.setVisitNewLists(visitNewLists);

    popupDialogCounselor.dismiss();
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

  changeStyleAccordingToInput(counselor) {
    if
    (this.props.visitListOfInviteesWithCounselorInformations[counselor.nuvemCode] !== undefined) {
      return [styles.listRegisters, { borderColor: '#FF9500' }];
    }
    return styles.listRegisters;
  }

  renderCounselorList() {
    if (this.props.application === true) {
      return (
        <ActivityIndicator style={styles.ConsuelorList} size="large" color="#FF9500" />
      );
    }
    return (
      this.props.listOfCounselorsInAGroup.map(counselor => (
        <View style={this.changeStyleAccordingToInput(counselor)} key={counselor.nuvemCode}>
          <TouchableOpacity
            onPress={() => this.manageInvitedListState(counselor)}
          >
            <View style={styles.textBox}>
              <LabeledField
                label="Nome"
                value={counselor.name}
                wrapperStyle={styles.text}
                labelStyle={styles.ConsuelorInformation}
              />
              <LabeledField
                label="CPF"
                value={counselor.profile.cpf}
                wrapperStyle={styles.text}
                labelStyle={styles.ConsuelorInformation}
              />
              <LabeledField
                label="Telefone"
                value={counselor.profile.phone}
                wrapperStyle={styles.text}
                labelStyle={styles.ConsuelorInformation}
              />
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  }
}

InviteAgent.propTypes = {
  counselor: PropTypes.shape({
    token: PropTypes.string.isRequired,
    nuvemCode: PropTypes.number.isRequired,
    profile: PropTypes.shape({
      codGroup: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  school: PropTypes.shape({
    schoolCode: PropTypes.number.isRequired,
    schoolName: PropTypes.string.isRequired,
  }).isRequired,
  visitListOfInvitees: PropTypes.shape({
  }).isRequired,
  setVisitNewLists: PropTypes.func.isRequired,
  application: PropTypes.bool.isRequired,
  listOfCounselorsInAGroup: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })).isRequired,
  visitListOfInviteesWithCounselorInformations: PropTypes.shape({
  }).isRequired,
};

export default InviteAgent;
