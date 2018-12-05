import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { TabViewAnimated, SceneMap, TabBar } from 'react-native-tab-view';
import Header from '../../components/Header';
import ManageNotAcceptedRegistersScreenContainer from '../../Containers/manageCounselors/ManageNotAcceptedRegistersScreenContainer';
import ManageAcceptedRegistersScreenContainer from '../../Containers/manageCounselors/ManageAcceptedRegistersScreenContainer';
import { backHandlerPopToMain } from '../../NavigationFunctions';
import styles from '../../Styles/ManageConselors/PrincipalManageRegisterStyles';

export default class Principal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Não gerenciados' },
        { key: 'second', title: 'Validados' },
      ],
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  handleIndexChange = index => this.setState({ index });

  renderFooter = props => <TabBar style={{ backgroundColor: '#FF9500', borderTopWidth: 1, borderBottomColor: 'black' }} tabStyle={{ paddingHorizontal: -0 }} {...props} />;

  renderHeader = props => <Header title="Gerenciar Registro" {...props} />

  renderScene = SceneMap({
    first: ManageNotAcceptedRegistersScreenContainer,
    second: ManageAcceptedRegistersScreenContainer,
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderScene={this.renderScene}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}
