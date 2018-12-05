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
  LAW_11947_DATE,
} from '../../constants/legislation/lawNumber11.947';
import { backHandlerPop } from '../../NavigationFunctions';
import styles from '../../Styles/LegislationStyles/LawNumber11947Styles';

export default class LawNumber11947Screen extends Component {
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
          subTitle="Lei Nº 11.947"
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
          <Text style={styles.title}>{LAW_11947_DATE}</Text>
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
