import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import InfoScreen from "../screens/InfoScreen";
import MapScreen from "../screens/MapScreen";
import EventScreen from "../screens/EventScreen";
import SettingScreen from "../screens/SettingScreen";
import TicketScreen from "../screens/ticket/TicketScreen";
import SuccessScreen from "../screens/ticket/SuccessScreen";
import EventDetails from "../screens/EventDetails";
import InfoUserScreen from "../screens/menu/InfoUser";
import SupportScreen from "../screens/menu/Support";
import ReviewScreen from "../screens/menu/Rate";
import ChangePasswordScreen from "../screens/menu/ChangePassword";
import TransactionHistoryScreen from "../screens/menu/TransactionHistory";
import DestinationScreen from "../screens/DestinationScreen";
import TourScreen from "../screens/tour/TourScreen.js";
import LoginScreen from "../screens/Account/Login.js";
import SignUpScreen from "../screens/Account/SignUp.js";
import TourDetail from "../screens/tour/TourDetail.js"

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Map" component={MapScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Ticket" component={TicketScreen} />
        <Stack.Screen name="SuccessTicket" component={SuccessScreen} />
        <Stack.Screen name="Tour" component={TourScreen} />
        <Stack.Screen name="TourDetail" component={TourDetail} />
        {/* <Stack.Screen name="EventDetails" component={EventDetails} /> */}
        {/* <Stack.Screen name="InfoUser" component={InfoUserScreen} /> */}
        {/* <Stack.Screen name="Support" component={SupportScreen} /> */}
        {/* <Stack.Screen name="Rate" component={ReviewScreen} /> */}
        {/* <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} /> */}
        {/* <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
