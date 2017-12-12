import React, { Component } from 'react';
import {
  StyleSheet,
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
  LAW_12982_DATE,
} from '../../constants/legislation/lawNumber12.982';
import { backHandlerPop } from '../../NavigationFunctions';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});

export default class LawNumber12982Screen extends Component {
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
          title={'Legislação'}
          subTitle={'Lei Nº 12.982'}
        />

        <View style={styles.selectors}>
          <Text style={styles.selectTitle}>Selecionar:</Text>
          {SELECTORS.map(selector => (
            <TouchableHighlight
              key={selector.title}
              onPress={() => this.setSection(selector.value)}
            >
              <View style={styles.selector}>
                <Text style={selector.value === this.state.activeSection && styles.activeSelector}>
                  {selector.title}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <ScrollView>
          <Text style={styles.title}>{LAW_12982_DATE}</Text>
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
