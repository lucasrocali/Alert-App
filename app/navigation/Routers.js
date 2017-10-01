import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import LoginScreen from '../screens/LoginScreen';
import EventListScreen from  '../screens/EventListScreen';
import AppointmentScreen from  '../screens/AppointmentScreen';
import ElementListScreen from  '../screens/ElementListScreen';
import ElementScreen from  '../screens/ElementScreen';
import HomeScreen from '../screens/HomeScreen';
import SelectItemScreen from  '../screens/SelectItemScreen';

// const RootStackNavigator = StackNavigator(
//   {
//     Main: {
//       screen: MainScreenStack,
//       navigationOptions: {
//         title: 'Main',
//       },
//     },
//   },
//   {
//     navigationOptions: () => ({
//       headerTitleStyle: {
//         fontWeight: 'normal',
//       },
//     }),
//   }
// );


export const SelectItemStack = StackNavigator({
  SelectItem: {
    screen: SelectItemScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'SelectItem',
    }),
  },
});

export const AppointmentStack = StackNavigator({
  EventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'Events',
    },
  },
  Appointment: {
    screen: AppointmentScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Apointment',
    }),
  },
});

export const ElementStack = StackNavigator({
  ElementList: {
    screen: ElementListScreen,
    navigationOptions: {
      title: 'Elements',
    },
  },
  Element: {
    screen: ElementScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Element',
    }),
  },
});

export const MainScreenStack = TabNavigator(
  {
    Home: {
      screen: AppointmentStack,
    },
    Links: {
      screen: ElementStack,
    },
    Settings: {
      screen: ElementStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios'
              ? `ios-link${focused ? '' : '-outline'}`
              : 'md-link';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);


export const Root = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Main: {
    screen: MainScreenStack,
  },
  SelectItem: {
    screen: SelectItemStack,
  },
  
  
}, {
  mode: 'modal',
  headerMode: 'none',
});