import React from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import InitialScreen from './src/screens/InitialScreen';
import LoginContainer from './src/Containers/LoginContainer';
import ProfileInfoScreenContainer from './src/Containers/ProfileInfoScreenContainer';
import RegisterScreenContainer from './src/Containers/RegisterScreenContainer';
import MainScreenContainer from './src/Containers/MainScreenContainer';
import SearchSchoolContainer from './src/Containers/SearchSchoolContainer';
import UpdateInfoScreenContainer from './src/Containers/UpdateInfoScreenContainer';
import StockFoodCheckoutScreenContainer from './src/Containers/reports/StockFoodCheckoutContainer';
import SchedulingVisitContainer from './src/Containers/SchedulingVisitContainer';
import SchoolInfoContainer from './src/Containers/SchoolInfoContainer';
import MainReportsContainer from './src/Containers/reports/MainReportsContainer';
import RefectoryCheckoutContainer from './src/Containers/reports/RefectoryCheckoutContainer';
import MenuContainer from './src/Containers/MenuContainer';
import KitchenCheckoutContainer from './src/Containers/reports/KitchenCheckoutContainer';
import FoodQualityCheckoutContainer from './src/Containers/reports/FoodQualityCheckoutContainer';
import DocCheckoutContainer from './src/Containers/reports/DocCheckoutContainer';
import ReportObservationContainer from './src/Containers/reports/ReportObservationContainer';
import SchoolSurroundingsCheckoutContainer from './src/Containers/reports/SchoolSurroundingsCheckoutContainer';
import FoodHandlerCheckoutContainer from './src/Containers/reports/FoodHandlerCheckoutContainer';
import WaterSewerSupplyCheckoutContainer from './src/Containers/reports/WaterSewerSupplyCheckoutContainer';
import FoodPreparationCheckoutContainer from './src/Containers/reports/FoodPreparationCheckoutContainer';
import PrincipalStartInspection from './src/screens/startInspection/PrincipalStartInspection';
import ScheduleMeetingContainer from './src/Containers/scheduleMeeting/ScheduleMeetingContainer';
import ScheduleMeetingMapContainer from './src/Containers/scheduleMeeting/ScheduleMeetingMapContainer';
import PrincipalManageRegister from './src/screens/manageCounselors/PrincipalManageRegister';
import MainLegislationScreen from './src/screens/legislation/MainLegislationScreen';
import Resolution26Screen from './src/screens/legislation/Resolution26Screen';
import Resolution1Screen from './src/screens/legislation/Resolution1Screen';
import LawNumber11947Screen from './src/screens/legislation/LawNumber11947Screen';
import LawNumber12982Screen from './src/screens/legislation/LawNumber12982Screen';
import ComplaintScreen from './src/screens/complaintScreen';
import PrincipalNotifications from './src/screens/PrincipalNotifications';
import VisitInvitesContainer from './src/Containers/VisitInvitesContainer';
import MeetingInvitesContainer from './src/Containers/MeetingInvitesContainer';

const Routes = () => ({
  render() {
    return (
      <Router>
        <Drawer
          hideNavBar
          key="drawer"
          drawerLockMode="locked-closed"
          contentComponent={MenuContainer}
          drawerWidth={270}
          drawerPosition="right"
        >
          <Scene key="root">
            <Scene key="initialScreen" component={InitialScreen} type="reset" hideNavBar />
            <Scene key="StartPendingInspection" component={PrincipalStartInspection} hideNavBar />
            <Scene key="complaintScreen" component={ComplaintScreen} hideNavBar />
            <Scene key="PrincipalNotifications" component={PrincipalNotifications} hideNavBar />
            <Scene key="VisitInvites" component={VisitInvitesContainer} hideNavBar />
            <Scene key="MeetingInvites" component={MeetingInvitesContainer} hideNavBar />
            <Scene
              key="scheduleMeetingMap"
              component={ScheduleMeetingMapContainer}
              hideNavBar
            />
            <Scene key="schedulingVisit" component={SchedulingVisitContainer} hideNavBar />
            <Scene
              key="scheduleMeeting"
              component={ScheduleMeetingContainer}
              hideNavBar
            />
            <Scene key="manageRegisters" component={PrincipalManageRegister} hideNavBar />
            <Scene key="mainScreen" component={MainScreenContainer} type="reset" hideNavBar />
            <Scene key="searchSchool" component={SearchSchoolContainer} hideNavBar />
            <Scene key="registerScreen" component={RegisterScreenContainer} hideNavBar />
            <Scene key="loginScreen" component={LoginContainer} hideNavBar />
            <Scene key="profileInfoScreen" component={ProfileInfoScreenContainer} hideNavBar />
            <Scene key="updateInfoScreen" component={UpdateInfoScreenContainer} hideNavBar />
            <Scene key="kitchenCheckoutScreen" component={KitchenCheckoutContainer} hideNavBar />
            <Scene key="DocCheckoutScreen" component={DocCheckoutContainer} hideNavBar />
            <Scene
              key="schedulingVisit"
              component={SchedulingVisitContainer}
              type="reset"
              hideNavBar
            />
            <Scene key="mainReportsScreen" component={MainReportsContainer} hideNavBar />
            <Scene
              key="ReportObservationScreen"
              component={ReportObservationContainer}
              hideNavBar
            />
            <Scene
              key="scheduleMeetingMap"
              component={ScheduleMeetingMapContainer}
              hideNavBar
            />
            <Scene key="schedulingVisit" component={SchedulingVisitContainer} hideNavBar />
            <Scene
              key="scheduleMeeting"
              component={ScheduleMeetingContainer}
              type="reset"
              hideNavBar
            />
            <Scene
              key="stockFoodCheckoutScreen"
              component={StockFoodCheckoutScreenContainer}
              hideNavBar
            />
            <Scene
              key="refectoryCheckoutScreen"
              component={RefectoryCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="foodQualityCheckoutScreen"
              component={FoodQualityCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="schoolSurroundingsCheckoutScreen"
              component={SchoolSurroundingsCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="foodHandlerCheckoutScreen"
              component={FoodHandlerCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="waterSewerSupplyCheckoutScreen"
              component={WaterSewerSupplyCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="foodPreparationCheckoutScreen"
              component={FoodPreparationCheckoutContainer}
              hideNavBar
            />
            <Scene key="schoolInfoScreen" component={SchoolInfoContainer} hideNavBar />
            <Scene key="lesgislationScreen" component={MainLegislationScreen} hideNavBar />
            <Scene key="Resolution26Screen" component={Resolution26Screen} hideNavBar />
            <Scene key="Resolution1Screen" component={Resolution1Screen} hideNavBar />
            <Scene key="LawNumber11947Screen" component={LawNumber11947Screen} hideNavBar />
            <Scene key="LawNumber12982Screen" component={LawNumber12982Screen} hideNavBar />
          </Scene>
        </Drawer>
      </Router>
    );
  },
});

export default Routes;
