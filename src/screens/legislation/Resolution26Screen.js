import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Linking,
  BackHandler,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Accordion from 'react-native-collapsible/Accordion';
import RenderContent from '../../components/AccordionContent';
import RenderHeader from '../../components/AccordionHeader';
import Header from '../../components/Header';
import {
  CONTENT,
  SELECTORS,
  RESOLUTION_26_DATE,
  ANEXOS,
} from '../../constants/legislation/resolutionNumber26';
import { backHandlerPop } from '../../NavigationFunctions';
import styles from '../../Styles/LegislationStyles/Resolution26ScreenStyles';

export default class Resolution26Screen extends Component {
  state = {
    activeSection: false,
    collapsed: true,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }

  setSection(section) {
    this.setState({ activeSection: section });
  }

  toggleExpanded() {
    this.setState({ collapsed: !this.state.collapsed });
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>
        <Header
          title="Legislação"
          subTitle="Resolução Nº 26"
        />
        <ScrollView
          horizontal
        >
          <View style={styles.selectors}>
            <Text style={styles.selectTitle}>Selecionar:</Text>
            {SELECTORS.map(selector => (
              <TouchableHighlight
                key={selector.title}
                onPress={() => this.setSection(selector.value)}
              >
                <View style={styles.selector}>
                  <Text
                    style={selector.value === this.state.activeSection && styles.activeSelector}
                  >
                    {selector.title}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
        <ScrollView>
          <Text style={styles.title}>{RESOLUTION_26_DATE}</Text>
          <Accordion
            activeSection={this.state.activeSection}
            sections={CONTENT}
            renderHeader={RenderHeader}
            renderContent={RenderContent}
            duration={400}
            onChange={section => this.setSection(section)}
          />
          <Hyperlink linkDefault linkStyle={{ color: '#2980b9' }}>
            <View style={styles.field}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>Anexos: </Text>
              <Text>{ANEXOS}</Text>
              <TouchableOpacity
                key="openLink"
                style={styles.fieldStyle}
                onPress={() => Linking.openURL('https://www.fnde.gov.br/fndelegis/action/UrlPublicasAction.php?acao=abrirAtoPublico&sgl_tipo=RES&num_ato=00000026&seq_ato=000&vlr_ano=2013&sgl_orgao=FNDE/MEC')}
              >
                <Text style={styles.buttonTexts}>Anexos</Text>
              </TouchableOpacity>
            </View>
          </Hyperlink>
        </ScrollView>
      </View>
    );
  }
}
