import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  BackHandler,
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';
import RenderContent from '../../components/AccordionContent';
import RenderHeader from '../../components/AccordionHeader';
import Header from '../../components/Header';
import {
  CONTENT,
  SELECTORS,
  RESOLUTION_1_DATE,
} from '../../constants/legislation/resolutionNumber1';
import { backHandlerPop } from '../../NavigationFunctions';
import styles from '../../Styles/LegislationStyles/Resolution1ScreenStyles';

export default class Resolution1Screen extends Component {
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title="Legislação"
          subTitle="Resolução Nº 1"
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
          <Text style={styles.title}>{RESOLUTION_1_DATE}</Text>
          <Accordion
            activeSection={this.state.activeSection}
            sections={CONTENT}
            renderHeader={RenderHeader}
            renderContent={RenderContent}
            duration={400}
            onChange={section => this.setSection(section)}
          />
        </ScrollView>
      </View>
    );
  }
}
