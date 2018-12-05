import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native-animatable';
import styles from '../Styles/SchedulingVisitStyles';

// stateless component declaration according to the convention
const ShowEmail = ({ agentEmail }) => (
  <View>
    <Text style={styles.TopListText}>
        Agente Convidado
    </Text>
    <View style={styles.InputFieldStyle}>
      <Text
        style={agentEmail !== '' ? '' : styles.NoInvitedAgent}
      >
        {agentEmail !== '' ? agentEmail : 'Nenhum agente convidado'}
      </Text>
    </View>
  </View>
);

ShowEmail.propTypes = {
  agentEmail: PropTypes.string.isRequired,
};

export default ShowEmail;
