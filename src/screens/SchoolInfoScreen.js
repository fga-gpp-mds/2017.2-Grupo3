import React from 'react';
import axios from 'axios';
import openMap from 'react-native-open-maps';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, ScrollView, BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SCHOOL_ENDPOINT } from '../constants/linkConstants';
import { logInfo, logWarn } from '../../logConfig/loggers';
import Header from '../components/Header';
import { backHandlerPop } from '../NavigationFunctions';
import styles from '../Styles/SchoolInfoScreenStyles';

const FILE_NAME = 'SchoolInfoScreen.js';

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
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentDidMount() {
    logInfo(FILE_NAME, 'componentWillMount',
      `URL:${SCHOOL_ENDPOINT}/${this.props.school.schoolCode}`);

    axios.get(`${SCHOOL_ENDPOINT}/${this.props.school.schoolCode}`, {
      params: {
        campos: 'nome,email,telefone,latitude,longitude,qtdAlunos',
      },
    })
      .then((response) => {
        logInfo(FILE_NAME, 'componentWillMount',
          `Successfully got school data: ${JSON.stringify(response.data, null, 2)}`);
        let schoolPhone = '';
        let schoolEmail = '';
        let schoolStudents = '';

        if (response.data.telefone !== undefined && response.data.telefone !== ' ') {
          schoolPhone = response.data.telefone;
        } else {
          schoolPhone = 'Informação não disponível';
        }
        if (response.data.email !== undefined && response.data.email !== ' ') {
          schoolEmail = response.data.email;
        } else {
          schoolEmail = 'Informação não disponível';
        }
        if (response.data.qtdAlunos !== undefined && response.data.qtdAlunos !== 0) {
          schoolStudents = response.data.qtdAlunos;
        } else {
          schoolStudents = 'Informação não disponível';
        }

        // Since we get the response in portuguese, we need to "translate" it so we
        // can add it in the store.
        this.props.setSchoolInfo(
          {
            schoolCode: response.data.codEscola,
            schoolName: response.data.nome,
            schoolPhone,
            schoolEmail,
            schoolLat: response.data.latitude,
            schoolLong: response.data.longitude,
            schoolStudents,
          },
        );
      })
      .catch((error) => {
        logWarn(FILE_NAME, 'componentWillMount', error);
      });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
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
    return (
      <Text style={styles.textResponse}>Localização não disponível</Text>
    );
  }

  showScheduleVisitButton() {
    if (this.props.school.uf === this.props.counselor.profile.CAE
      || `${this.props.school.city} - ${this.props.school.uf}` === this.props.counselor.profile.CAE) {
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
      <View style={styles.schoolInfoScreen}>
        <Header
          title="Informações da Escola"
        />
        <ScrollView>
          <Text style={styles.text}>Infomações</Text>
          <View style={styles.listInfo}>
            <Text style={styles.textInfotmation}>Nome:</Text>
            <Text style={styles.textResponse}>{this.props.school.schoolName}</Text>

            <Text style={styles.textInfotmation}>Email:</Text>
            <Text style={styles.textResponse}>{this.props.school.schoolEmail}</Text>

            <Text style={styles.textInfotmation}>Telefone:</Text>
            <Text style={styles.textResponse}>{this.props.school.schoolPhone}</Text>

            <Text style={styles.textInfotmation}>Quantidade de Alunos:</Text>
            <Text style={styles.textResponse}>{this.props.school.schoolStudents}</Text>

            <Text style={styles.textInfotmation}>Localização:</Text>
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

const {
  shape, func, number, string,
} = PropTypes;

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
