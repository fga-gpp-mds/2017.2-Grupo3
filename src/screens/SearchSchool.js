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
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { logInfo, logWarn } from '../../logConfig/loggers';
import Header from '../components/Header';
import brazilianStates from '../brazilianStates';
import municipalDistricts from '../municipalDistricts';

import { SCHOOL_ENDPOINT } from '../constants';
import SchoolListButton from '../components/SchoolListButton';

const FILE_NAME = 'SearchSchool.js';

const styles = StyleSheet.create({
  headerBox: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bodyBox: {
    flex: 10,
    alignItems: 'center',
  },

  textLogo: {
    flex: 1,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    flex: 2.5,
    justifyContent: 'center',
    width: 320,
    marginTop: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
  },

  item: {
    flex: 1,
    width: null,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: 7,
  },

  buttonSelectSchool: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  InputFieldDropdown: {
    marginTop: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
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
      isOpen: false,
      isLoading: false,
      uf: '',
      city: '',
      name: '',
      schoolList: [],
    };

    this.validateName = this.validateName.bind(this);
    this.validateCity = this.validateCity.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
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
    console.log('searchschools method');
    console.log(this.state);
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
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          logWarn(FILE_NAME, 'searchSchools', error);
        });
    });
  }

  buttonActivation() {
    if ((this.state.name > '' && this.state.uf > '') ||
    ((this.state.city !== 'Brasília' && this.state.city > '') && this.state.uf > '')) {
      if (this.state.isLoading) {
        return (
          <ActivityIndicator
            style={{ paddingBottom: 10 }}
            size="large"
            color="#FF9500"
          />
        );
      }
      console.log('Button activated');
      return (
        <TouchableOpacity
          key="activatedButton"
          style={styles.buttonSearchAnabled}
          activeOpacity={0.7}
          onPress={() => this.register()}
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
            (<Picker.Item label={item} value={item} color="#000000" />))}
        </Picker>
      </View>
    ) : null;

    return (

      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={'Pesquisar Escola'}
          backButton
        />
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
                    })
                )}
                selectedValue={this.state.uf}
              >
                <Picker.Item value="" label="Escolha a sua UF " color="#95a5a6" />
                {brazilianStates.estados.map(item =>
                  (<Picker.Item label={item} value={item} color="#000000" />))}
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

          <View style={styles.listSchools} key="schoolListView">
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
          </View>

          <View key="renderButton" style={styles.buttonArea} >
            {this.buttonActivation()}
          </View>
        </View>
      </ScrollView>

    );
  }
}

SearchSchool.propTypes = {
  setSchoolInfo: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setUf: PropTypes.func.isRequired,
};

export default SearchSchool;
