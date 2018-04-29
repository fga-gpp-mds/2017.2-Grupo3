import React from 'react';
import { StyleSheet, View, Text, ScrollView, BackHandler } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Header from '../components/Header';
import * as constant from '../constants/publicAgencyInformations';
import { backHandlerPopToMain } from '../NavigationFunctions';

const styles = StyleSheet.create({
  complaintScreen: {
    flex: 1,
  },

  textBox: {
    marginTop: 20,
    paddingLeft: 2,
    justifyContent: 'flex-start',
  },

  field: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'gray',
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'flex-start',
    paddingLeft: 2,
    paddingRight: 4,
  },

  information: {
    fontSize: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

class complaintScreen extends React.PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  render() {
    return (
      <View style={styles.complaintScreen}>
        <Header
          title={'Denunciar'}
        />
        <ScrollView>
          <Hyperlink linkDefault linkStyle={{ color: '#2980b9' }}>
            <View style={styles.textBox}>
              <Text style={[styles.title, { fontSize: 20 }]}>{constant.COMPLAINT_TITLE}</Text>
            </View>

            {
              constant.ALL_PUBLIC_DATA.map(item => (
                <View style={styles.field}>
                  <Text style={styles.title}>{item.title}</Text>
                  {
                    item.payload.map(data => (
                      <Text style={styles.information}>
                        <Text style={{ fontWeight: 'bold' }}>{data.label}</Text>
                        {data.value}
                      </Text>
                    ))
                  }
                </View>
              ))
            }
          </Hyperlink>
        </ScrollView>
      </View>
    );
  }
}

export default complaintScreen;
