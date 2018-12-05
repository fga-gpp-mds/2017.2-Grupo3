import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../Styles/InitialScreenStyles';

const initialBackgroundImage = require('../images/initial_background.jpg');

const InitialScreen = () => ({
  render() {
    return (
      <ImageBackground style={styles.initialBackgroundImage} source={initialBackgroundImage}>
        <View style={styles.initialScreen}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.titleText}>MERENDA +</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.7}
              onPress={() => Actions.loginScreen()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              activeOpacity={0.7}
              onPress={() => Actions.registerScreen()}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

    );
  },
});

export default InitialScreen;
