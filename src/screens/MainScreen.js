import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/MainScreenStyles';

class MainScreen extends React.Component {
  componentWillMount() {
    this.props.resetStore('list', 'report', 'school');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={styles.headerBox}>
          <Text style={styles.textLogo}>Merenda +</Text>

          <TouchableOpacity
            onPress={() => Actions.drawerOpen()}
          >
            <FontAwesome name="navicon" size={32} />
          </TouchableOpacity>
        </View>

        <View style={styles.bodyBox}>
          <TouchableOpacity
            style={styles.buttonInspect}
            activeOpacity={0.7}
            onPress={() => Actions.StartPendingInspection()}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Fiscalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { func } = PropTypes;

MainScreen.propTypes = {
  resetStore: func.isRequired,
};

export default MainScreen;
