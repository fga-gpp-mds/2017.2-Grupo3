import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  CLOSE_TABLE,
  HEADER_DOC,
  HEADER_TABLE,
  CLOSE_BODY,
  OPEN_BODY,
  OPEN_TABLE,
  SECTIONS,
} from '../constants/reportPDF';
import replaceDiacritics from '../services/replaceDiacritics';
import { LOADING_RESULT } from '../constants/toastMessages';


const buttonBoxStyle = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#4cd964',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default class PDFReport extends Component {
  async getData() {
    const getData = {
      appToken: this.props.counselor.token,
      codPostagem: this.props.visitSchedule.codPostagem,
    };
    await this.props.asyncGetCurrentPost(getData);
  }

  generateHeader() {
    let header = OPEN_TABLE;
    header += `<tr><td><b>Escola:</b></td> <td>${replaceDiacritics(this.props.visitSchedule.content.schoolName)}</td></tr>`;
    header += `<tr><td><b>Data:</b></td> <td>${this.props.visitSchedule.content.date.replace('-', '//')}</td></tr>`;
    header += `<tr><td><b>Conselheiro:</b></td> <td>${this.props.counselor.name}</td></tr>`;
    header += CLOSE_TABLE;
    return header;
  }

  generateSection(key) {
    let body = '';
    if (key !== 'otherObservation') {
      body += `<h2>${replaceDiacritics(SECTIONS[key])}</h2>`;
      body += `<b>${this.props.reportResult[key].status ? 'Concluido' : 'Nao Concluido'}</b>`;
      body += this.generateTable(key);
      body += this.generateObservation(key);
      if (key === 'foodQuality') {
        if (this.props.reportResult[key].additionalData.acceptedMenu !== ''
          && this.props.reportResult[key].additionalData.acceptedMenu !== undefined) {
          body += '<h4>Menu Aceito<h4>';
          body += `<p align="justify">
          ${this.props.reportResult[key].additionalData.acceptedMenu}</p>`;
        } else if (this.props.reportResult[key].additionalData.refusedMenu !== ''
          && this.props.reportResult[key].additionalData.refusedMenu !== undefined) {
          body += '<h4>Menu Recusado<h4>';
          body += `<p align="justify">
          ${this.props.reportResult[key].additionalData.refusedMenu}</p>`;
        }
      }
    } else {
      body += `<h2>${replaceDiacritics(SECTIONS[key])}</h2>`;
      body += `<b>${this.props.reportResult[key].status ? 'Concluido' : 'Nao Concluido'}</b>`;
      body += this.generateObservation(key);
    }

    body += '<br> <br>';
    return body;
  }

  generateObservation(key) {
    let observation = '';
    if (this.props.reportResult[key].textObservation !== ''
      && this.props.reportResult[key].textObservation !== undefined) {
      observation += '<h4>Observacoes:</h4><br>';
      observation += `<div text-align="justify"> 
        ${this.props.reportResult[key].textObservation} 
        </div>`;
    }
    return observation;
  }

  generateTable(key) {
    let table = OPEN_TABLE + HEADER_TABLE;
    this.props.reportResult[key].questions.map((item) => {
      const row = `
        <tr>
          <td>${item.question}</td>
          <td>${replaceDiacritics(item.label)}</td>
          <td>${replaceDiacritics(item.answer)}</td>
        </tr>`;
      table += row;
      return table;
    });

    table += CLOSE_TABLE;
    return table;
  }

  async createDocument() {
    let doc = HEADER_DOC + OPEN_BODY;

    doc += this.generateHeader();

    await Object.keys(this.props.reportResult).forEach((key) => {
      if (key !== LOADING_RESULT) {
        doc += this.generateSection(key);
      }
    });

    doc += CLOSE_BODY;
    return doc;
  }

  async createPDF() {
    this.props.isLoadingResult();
    this.props.onPressPopUp();
    await this.getData();
    const doc = await this.createDocument();

    const nameFile = this.props.visitSchedule.content.date
      + replaceDiacritics(this.props.visitSchedule.content.schoolName);

    const options = {
      html: doc,
      fileName: nameFile,
      directory: 'docs',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      const path = `file:// + ${file.filePath}`;

      Linking.canOpenURL(path).then((supported) => {
        if (supported) {
          console.log(supported);
          Linking.openURL(path);
        } else {
          console.log('Dont know how to open URL');
        }
      });
    } catch (error) {
      console.log(error);
    }

    this.props.isNotLoadingResult();
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={buttonBoxStyle.design}
          onPress={() => this.createPDF()}
        >
          <Text style={buttonBoxStyle.text}>RELATÓRIO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


PDFReport.propTypes = {
  reportResult: PropTypes.shape({}).isRequired,
  asyncGetCurrentPost: PropTypes.func.isRequired,
  onPressPopUp: PropTypes.func.isRequired,
  visitSchedule: PropTypes.shape({
    codPostagem: PropTypes.number.isRequired,
    content: PropTypes.shape({
      schoolName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  counselor: PropTypes.shape({
    token: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isLoadingResult: PropTypes.func.isRequired,
  isNotLoadingResult: PropTypes.func.isRequired,
};
