import React from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import openMap from 'react-native-open-maps';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 6,
    backgroundColor: 'white',
  },

  text: {
    fontSize: 15,
    paddingVertical: 2,
  },

  buttonText: {
    fontSize: 12,
    textAlign: 'center',
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

class LocalizationButton extends React.PureComponent {
  goToMaps() {
    openMap({ latitude: this.props.visitLat, longitude: this.props.visitLong });
  }

  render() {
    return (
      <View key="localizationButton">
        <Text style={{ color: '#95a5a6', fontSize: 20 }}>Localização: </Text>
        <TouchableOpacity
          onPress={() => this.goToMaps()}
          style={styles.buttonMap}
          activeOpacity={0.7}
          key="VisitLocalizationButton"
        // <Image source={Location} />
        >
          <Text style={styles.buttonText}>Ver no Mapa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LocalizationButton.propTypes = {
  visitLat: PropTypes.number.isRequired,
  visitLong: PropTypes.number.isRequired,
};

export default LocalizationButton;
