import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import LoginScreen from '../screens/LoginScreen';
import EventListScreen from  '../screens/EventListScreen';
import EventMapScreen from  '../screens/EventMapScreen';
import EventScreen from  '../screens/EventScreen';
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


export const AddEventStack = StackNavigator({
  AddEvent: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'AddEvent',
      gesturesEnabled: false,
    }),
  },
});

export const SelectItemStack = StackNavigator({
  SelectItem: {
    screen: SelectItemScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'SelectItem',
      gesturesEnabled: false,
    }),
  },
});


export const EventMapStack = StackNavigator({
  EventList: {
    screen: EventMapScreen,
    navigationOptions: {
      title: 'Event Map',
      gesturesEnabled: false,
    },
  },
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Event',
      gesturesEnabled: false,
    }),
  },
});

export const EventListStack = StackNavigator({
  EventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'Event List',
      gesturesEnabled: false,
    },
  },
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Event',
      gesturesEnabled: false,
    }),
  },
});

export const ElementStack = StackNavigator({
  ElementList: {
    screen: ElementListScreen,
    navigationOptions: {
      title: 'Elements',
      gesturesEnabled: false,
    },
  },
  Element: {
    screen: ElementScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Element',
      gesturesEnabled: false,
    }),
  },
});

export const MainScreenStack = TabNavigator(
  {
    Home: {
      screen: EventMapStack ,
    },
    Links: {
      screen: EventListStack,
    },
    Settings: {
      screen: AddEventStack,
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
    gesturesEnabled: false,
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