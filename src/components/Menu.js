import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, StyleSheet, View, Alert, ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuButton from './MenuButton';
import MENU_ITENS from '../constants/menuItens';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    height: window.height,
    backgroundColor: '#FF9500',
    paddingTop: 20,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
});

class Menu extends React.PureComponent {
  render() {
    return (
      <View style={styles.menu}>
        <ScrollView>
          {
            MENU_ITENS.map(item => (
              item.key !== 'manageRegisters'
              || (this.props.counselor.profile.isPresident
              && item.key === 'manageRegisters')
                ? (
                  <MenuButton
                    key={item.key}
                    text={item.text}
                    iconName={item.iconName}
                    onPress={() => {
                      switch (item.key) {
                        case 'searchSchool':
                          Actions.searchSchool();
                          break;
                        case 'profileInfoScreen':
                          Actions.profileInfoScreen();
                          break;
                        case 'schedulingVisit':
                          Actions.schedulingVisit();
                          break;
                        case 'scheduleMeeting':
                          Actions.scheduleMeeting();
                          break;
                        case 'notifications':
                          Actions.PrincipalNotifications();
                          break;
                        case 'manageRegisters':
                          Actions.manageRegisters();
                          break;
                        case 'seeLegislation':
                          Actions.lesgislationScreen();
                          break;
                        case 'doComplaint':
                          Actions.complaintScreen();
                          break;
                        case 'logout':
                          Alert.alert(
                            'Sair',
                            'Realmente deseja sair da sua conta?',
                            [
                              { text: 'Não', onPress: () => Actions.drawerOpen(), style: 'cancel' },
                              { text: 'Sim', onPress: () => Actions.initialScreen() },
                            ],
                            { cancelable: false },
                          );
                          break;
                        default: break;
                      }
                    }}
                  />
                ) : undefined
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

Menu.propTypes = {
  counselor: PropTypes.shape({
    profile: {
      isPresident: PropTypes.bool.isRequired,
    },
  }),
};

Menu.defaultProps = {
  counselor: PropTypes.shape({
    profile: {
      isPresident: false,
    },
  }),
};
export default Menu;
