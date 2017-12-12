import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import { backHandlerPopToMain } from '../NavigationFunctions';

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  button: {
    width: 320,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 60,
  },
});

class PrincipalNotifications extends React.PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  render() {
    return (
      <View style={styles.principal}>
        <Header
          title={'Notificações'}
          onPress={() => Actions.popTo('mainScreen')}
        />
        <View style={{ flex: 1, marginTop: 160 }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => Actions.VisitInvites()}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Convites de Visita</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => Actions.MeetingInvites()}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Convites de Reunião</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PrincipalNotifications;
