import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import stylesList from '../../Styles/ListStyles';
import ScheduleCard from '../../components/ScheduleCard';
import Button from '../../components/Button';
import { getVisitData } from '../../services/extractDataInspection';
import { styles, buttonBox } from '../../Styles/StartInspection/StartExpiredInspectionStyles';

class StartExpiredInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  arrayScheduleList() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FF9500" />
      );
    } if (this.props.listOfExpiredScheduleInAGroup.length === 0) {
      return (
        <View style={stylesList.noneScheduleTextBox}>
          <Text style={stylesList.noneScheduleText}>Nenhum Agendamento Expirado!</Text>
        </View>
      );
    }
    return (
      this.props.listOfExpiredScheduleInAGroup.map(visitSchedule => (
        <ScheduleCard
          visitSchedule={visitSchedule}
          data={getVisitData(visitSchedule)}
          keyProp={`EX${visitSchedule.codPostagem}`}
        >
          <View style={{ flex: 2 }}>
            <Button
              style={buttonBox}
              enabled={false}
              text="EXPIRADO"
              onPress={() => { }}
            />
          </View>
        </ScheduleCard>
      ))
    );
  }

  render() {
    return (
      <View style={styles.principal}>
        <ScrollView style={styles.content}>
          {this.arrayScheduleList()}
        </ScrollView>
      </View>
    );
  }
}

StartExpiredInspection.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  listOfExpiredScheduleInAGroup: PropTypes.arrayOf(PropTypes.shape({
    codSchool: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
  })).isRequired,
};

export default StartExpiredInspection;
