import React from 'react';
import axios from 'axios';
import openMap from 'react-native-open-maps';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SCHOOL_ENDPOINT } from '../constants';
import { logInfo, logWarn } from '../../logConfig/loggers';
import Header from '../components/Header';

const FILE_NAME = 'SchoolInfoScreen.js';

const styles = StyleSheet.create({
  headerBox: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLogo: {
    flex: 1,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  listInfo: {
    flex: 4,
    marginHorizontal: 10,
    padding: 10,
    width: 340,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
  },

  text: {
    flexDirection: 'row',
    color: '#95a5a6',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },

});

class SchoolInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: false,
      name: '',
      phone: '',
      email: '',
    };
  }


  componentWillMount() {
    logInfo(FILE_NAME, 'componentWillMount',
      `URL:${SCHOOL_ENDPOINT}/${this.props.school.schoolCode}`);

    axios.get(`${SCHOOL_ENDPOINT}/${this.props.school.schoolCode}`, {
      params: {
        campos: 'nome,email,telefone,latitude,longitude',
      },
    })
      .then((response) => {
        logInfo(FILE_NAME, 'componentWillMount',
          `Successfully got school data: ${JSON.stringify(response.data, null, 2)}`);

        // Since we get the response in portuguese, we need to "translate" it so we
        // can add it in the store.
        this.props.setSchoolInfo(
          {
            schoolCode: response.data.codEscola,
            schoolName: response.data.nome,
            schoolPhone: response.data.telefone,
            schoolEmail: response.data.email,
            schoolLat: response.data.latitude,
            schoolLong: response.data.longitude,
          });
      })
      .catch((error) => {
        logWarn(FILE_NAME, 'componentWillMount', error);
      });
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  }

  selectSchoolForSchedule() {
    this.props.setSchoolInfo(
      {
        schoolSelected: true,
        schoolCode: this.props.school.schoolCode,
        schoolName: this.props.school.schoolName,
        schoolPhone: this.props.school.schoolPhone,
        schoolEmail: this.props.school.schoolEmail,
        schoolLat: this.props.school.schoolLat,
        schoolLong: this.props.school.schoolLong,
      },
    );
    Actions.schedulingVisit();
  }

  showLocalizationButton() {
    if (this.props.school.schoolLat !== undefined) {
      return (
        <View key="renderButton">
          <Text style={{ color: '#95a5a6', fontSize: 20 }}>Localização: </Text>
          <TouchableOpacity
            onPress={() => this.goToMaps()}
            style={styles.buttonContainer}
            activeOpacity={0.7}
          // <Image source={Location} />
          >
            <Text style={styles.buttonText}>Ver no Mapa</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // If we can't return the button, return nothing.
    return (null);
  }

  showScheduleVisitButton() {
    if (this.props.school.uf === this.props.counselor.profile.CAE ||
       `${this.props.school.city} - ${this.props.school.uf}` === this.props.counselor.profile.CAE) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.selectSchoolForSchedule()}
            style={styles.buttonContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Agendar Visita</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // If we can't return the button, return nothing.
    return (null);
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  goToMaps() {
    // const url = `https://www.google.com/maps/?q=${this.props.school.schoolLat},${this.props.school.schoolLong}`;
    // Linking.openURL(url);
    openMap({ latitude: this.props.school.schoolLat, longitude: this.props.school.schoolLong });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={'Informações da Escola'}
          backButton
        />
        <ScrollView>
          <Text style={styles.text}>  Infomações</Text>
          <View style={styles.listInfo}>
            <Text style={{ color: '#95a5a6', fontSize: 20 }}>Nome: </Text>
            <Text style={{ color: 'black', fontSize: 19 }}>{this.props.school.schoolName}</Text>
            <Text style={{ color: '#95a5a6', fontSize: 20 }}>Email: </Text>
            <Text style={{ color: 'black', fontSize: 19 }}>{this.props.school.schoolEmail}</Text>
            <Text style={{ color: '#95a5a6', fontSize: 20 }}>Telefone: </Text>
            <Text style={{ color: 'black', fontSize: 19 }}>{this.props.school.schoolPhone}</Text>
            {this.showLocalizationButton()}
          </View>
        </ScrollView>

        {this.showScheduleVisitButton()}

        <TouchableOpacity
          // onPress={}
          style={styles.buttonContainer}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Acessar Visitas</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { shape, func, number, string } = PropTypes;

SchoolInfoScreen.propTypes = {
  setSchoolInfo: func.isRequired,
  counselor: shape({
    CAE: string.isRequired,
  }).isRequired,
  school: shape({
    schoolCode: number.isRequired,
  }).isRequired,
};

export default SchoolInfoScreen;
