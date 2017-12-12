import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  BackHandler,
  FlatList,
  ActivityIndicator,
  Alert,
  Picker,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { logInfo, logWarn } from '../../logConfig/loggers';
import Header from '../components/Header';
import ShowToast from '../components/Toast';
import SchoolListButton from '../components/SchoolListButton';
import brazilianStates from '../constants/brazilianStates';
import municipalDistricts from '../constants/municipalDistricts';

import {
  SCHOOL_ENDPOINT,
  SCHOOL_NOT_FOUND,
  ERROR_FIND_SCHOOL } from '../constants/generalConstants';
import { backHandlerPopToMain } from '../NavigationFunctions';


const FILE_NAME = 'SearchSchool.js';

const styles = StyleSheet.create({
  searchSchoolScreen: {
    flex: 1,
    backgroundColor: 'white',
  },

  bodyBox: {
    flex: 10,
    alignItems: 'center',
  },
  content: {
    flex: 6,
    marginTop: 8,
  },

  icon: {
    margin: 8,
  },

  buttonSearchAnabled: {
    paddingHorizontal: 117,
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#FF9500',
    borderRadius: 8,
    borderWidth: 1,
  },

  buttonSearchDisabled: {
    paddingHorizontal: 117,
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
    borderWidth: 1,
  },

  listSchools: {
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    height: 400,
  },

  item: {
    flex: 1,
    width: null,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: 7,
  },

  buttonArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  InputDropdown: {
    marginTop: 15,
    paddingLeft: 2,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,

  },

  Input: {
    marginTop: 20,
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },
});

console.disableYellowBox = true;

class SearchSchool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
      isOpen: false,
      isLoading: false,
      uf: this.props.counselor.profile.CAE_UF,
      city: this.props.counselor.profile.CAE_municipalDistrict.replace(/-/g, '').trim(),
      name: '',
      schoolList: [],
    };

    this.validateName = this.validateName.bind(this);
    this.validateCity = this.validateCity.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  setStateAsync(data) {
    return new Promise((resolve) => {
      this.setState(data, resolve);
    });
  }

  validateName(name) {
    const validName = name.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]/g, '');
    this.setState({ name: validName });
  }

  validateCity(city) {
    const validCity = city.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
    this.setState({ city: validCity });
  }

  register() {
    const nameRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]/g;
    const cityRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
    let error = false;
    let errorMessage = '';

    if (!cityRegex.test(this.state.city) && !nameRegex.test(this.state.name) && !(this.state.uf > '')) {
      error = true;
      errorMessage += 'Estado/Município e Escola com dados inválidos.';
    }
    if (this.state.city.trim() === '' && this.state.name.trim() === '' && this.state.uf.trim() === '') {
      error = true;
      errorMessage += 'Estado/Município e Escola não preenchidos. Preencha no mínimo um dos campos.\n';
    }
    if (error === false) {
      this.searchSchools();
    } else {
      Alert.alert('FALHA NA PESQUISA', errorMessage);
    }
    this.props.setUf(this.state.uf.substr(0, 2));
    this.props.setCity(this.state.city);
  }

  searchSchools() {
    this.setState({ isLoading: true });
    return new Promise((resolved) => {
      axios.get(SCHOOL_ENDPOINT, {
        params: {
          nome: this.state.name,
          municipio: this.state.city,
          campos: 'nome',
          uf: this.state.uf.substr(0, 2),
        },
      })
        .then(async (response) => {
          logInfo(FILE_NAME, 'searchSchools', 'Successfully searched school lists.');
          logInfo(FILE_NAME, 'searchSchools', `School List: ${JSON.stringify(response.data, null, 2)}`);

          resolved(await this.setStateAsync(
            { schoolList: response.data, isLoading: false },
          ));

          logInfo(FILE_NAME, 'searchSchools', `New state: ${JSON.stringify(this.state, null, 2)}.`);
          // If response is an empty array, no schools could be found.
          if (this.state.schoolList.length === 0) {
            ShowToast.Toast(SCHOOL_NOT_FOUND);
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          logWarn(FILE_NAME, 'searchSchools', error);
          ShowToast.Toast(ERROR_FIND_SCHOOL);
        });
    });
  }

  showFlatList() {
    if (this.state.schoolList.length !== 0) {
      return (
        <View style={styles.listSchools} key="schoolListView">
          <ScrollView
            /* This make the nested ScrollView works. */
            onTouchStart={() => this.setState({ enabled: false })}
            onTouchEnd={() => this.setState({ enabled: true })}
            onScrollBeginDrag={() => this.setState({ enabled: false })}
            onScrollEndDrag={() => this.setState({ enabled: true })}
          >
            <FlatList
              data={this.state.schoolList}
              keyExtractor={item => item.nome}
              renderItem={({ item }) => (
                <SchoolListButton
                  onPress={() => this.props.setSchoolInfo(item.codEscola)}
                  item={item}
                />
              )
              }
            />
          </ScrollView>
        </View>
      );
    }
    return (null);
  }

  buttonActivation() {
    if ((this.state.name > '' && this.state.uf > '') ||
    ((this.state.city !== 'Brasília' && this.state.city > '') && this.state.uf > '')) {
      if (this.state.isLoading) {
        return (
          <ActivityIndicator
            style={{ paddingVertical: 20 }}
            size="large"
            color="#FF9500"
          />
        );
      }
      return (
        <TouchableOpacity
          key="activatedButton"
          style={styles.buttonSearchAnabled}
          activeOpacity={0.7}
          onPress={() => {
            Keyboard.dismiss();
            this.register();
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Pesquisar</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.buttonSearchDisabled}
        disabled
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Pesquisar</Text>
      </TouchableOpacity>
    );
  }

  render() {
    logInfo(FILE_NAME, 'render()',
      `State of search page: ${JSON.stringify(this.state, null, 2)}`);

    const UfInitials = this.state.uf.substr(0, 2);

    const municipalDistrict = this.state.uf !== '' && this.state.uf !== 'DF - Distrito Federal' ? (
      <View
        key="municipalDistrict"
        style={styles.InputDropdown}
      >
        <Picker
          onValueChange={city => this.setState({ city })}
          selectedValue={this.state.city}
        >
          <Picker.Item value="" label="Escolha o Municipio" color="#95a5a6" />
          {municipalDistricts[UfInitials].cidades.map(item =>
            (<Picker.Item label={item} value={item} key={item} color="#000000" />))}
        </Picker>
      </View>
    ) : null;

    return (

      <View style={styles.searchSchoolScreen}>
        <Header
          title={'Pesquisar Escola'}
          onPress={() => Actions.popTo('mainScreen')}
        />
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <ScrollView
            /* This make the nested ScrollView works. */
            scrollEnabled={this.state.enabled}
          >
            <View style={{ marginLeft: 5, marginTop: 10 }}>
              <Text style={{ color: '#585858' }}>Para realizar a pesquisa é necessário inserir os campos abaixo</Text>
            </View>
            <View style={styles.bodyBox}>
              <View style={{ flex: 3 }}>
                <View
                  style={styles.InputDropdown}
                >
                  <Picker
                    onValueChange={uf => (
                      uf === 'DF - Distrito Federal' ?
                        this.setState({
                          ...this.state,
                          uf,
                          city: 'Brasília',
                        })
                        :
                        this.setState({
                          ...this.state,
                          uf,
                          city: '',
                        })
                    )}
                    selectedValue={this.state.uf}
                  >
                    <Picker.Item value="" label="Escolha a sua UF " color="#95a5a6" />
                    {
                      brazilianStates.estados.map(item => (
                        <Picker.Item label={item} value={item} key={item} color="#000000" />
                      ))
                    }
                  </Picker>
                </View>

                {municipalDistrict}

                <View style={styles.Input}>
                  <FontAwesome name="search" style={styles.icon} size={30} color="black" />
                  <TextInput
                    width={280}
                    returnKeyType="go"
                    maxLength={50}
                    keyboardType={'default'}
                    onChangeText={text => this.validateName(text)}
                    value={this.state.name}
                    underlineColorAndroid="transparent"
                    placeholder="Escola a pesquisar"
                  />
                </View>

              </View>

              {this.showFlatList()}

              <View key="renderButton" style={styles.buttonArea} >
                {this.buttonActivation()}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const { shape, string, number, bool, func } = PropTypes;

SearchSchool.propTypes = {
  setSchoolInfo: func.isRequired,
  setCity: func.isRequired,
  setUf: func.isRequired,
  counselor: shape({
    name: string.isRequired,
    nuvemCode: number.isRequired,
    token: string.isRequired,
    userName: string.isRequired,
    profile: shape({
      cpf: string.isRequired,
      phone: string.isRequired,
      isPresident: bool.isRequired,
      counselorType: string.isRequired,
      segment: string.isRequired,
      CAE_Type: string.isRequired,
      CAE_UF: string.isRequired,
      CAE_municipalDistrict: string.isRequired,
      CAE: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SearchSchool;
