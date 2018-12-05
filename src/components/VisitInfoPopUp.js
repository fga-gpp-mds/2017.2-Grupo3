import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import LocalizationButton from './LocalizationButton';

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

  dialogButtonStyle: {
    marginVertical: -10,
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

class VisitInfoPopUp extends React.PureComponent {
  render() {
    let localizationbutton = null;

    if (this.props.visit.visitLat !== null && this.props.visit.visitLong !== null) {
      localizationbutton = (
        <LocalizationButton
          key="VisitLocalizationButtonOnPopUp"
          visitLat={this.props.visit.visitLat}
          visitLong={this.props.visit.visitLong}
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
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Número de convidados: </Text>
            {Object.keys(this.props.visit.content.visitListOfInvitees).length}
          </Text>
          {localizationbutton}
        </View>
      </View>
    );
  }
}

VisitInfoPopUp.propTypes = {
  visit: PropTypes.shape({
    content: {
      agentEmail: PropTypes.string,
      codSchool: PropTypes.number,
      date: PropTypes.string,
      invitedAgent: PropTypes.bool,
      schoolName: PropTypes.string,
      time: PropTypes.string,
    },
    visitListOfInvitees: PropTypes.shape({}),
    visitLat: PropTypes.number,
    visitLong: PropTypes.number,
  }),
};

VisitInfoPopUp.defaultProps = {
  visit: {
    content: {
      agentEmail: 'email@email.com',
      codSchool: 0,
      date: '10-10-2017',
      invitedAgent: false,
      schoolName: 'Escola',
      time: '10:10',
    },
    visitListOfInvitees: {
      1: {},
    },
    visitLat: 0,
    visitLong: 0,
  },
};

export default VisitInfoPopUp;
