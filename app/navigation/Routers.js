import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EventListScreen from  '../screens/EventListScreen';
import EventMapScreen from  '../screens/EventMapScreen';
import EventScreen from  '../screens/EventScreen';
import SelectCategoryScreen from  '../screens/SelectCategoryScreen';
import SelectTagsScreen from  '../screens/SelectTagsScreen';
import PerfilScreen from '../screens/PerfilScreen';

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
export const SignupStack = StackNavigator({
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Signup',
      //gesturesEnabled: false,
    }),
  },
});

export const LoginStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
      //gesturesEnabled: false,
    }),
  },
});

export const PerfilStack = StackNavigator({
  Perfil: {
    screen: PerfilScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Perfil',
      //gesturesEnabled: false,
    }),
  },
});


export const AddEventStack = StackNavigator({
  AddEvent: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'AddEvent',
      //gesturesEnabled: false,
    }),
  },
});

export const SelectCategoryStack = StackNavigator({
  SelectCategory: {
    screen: SelectCategoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Select Category',
      //gesturesEnabled: false,
    }),
  },
});

export const SelectTagsStack = StackNavigator({
  SelectTags: {
    screen: SelectTagsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Select Tags',
      //gesturesEnabled: false,
    }),
  },
});

export const EventMapStack = StackNavigator({
  EventList: {
    screen: EventMapScreen,
    navigationOptions: {
      title: 'Event Map',
      //gesturesEnabled: false,
    },
  },
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Event',
      //gesturesEnabled: false,
    }),
  },
});

export const EventListStack = StackNavigator({
  EventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'Event List',
      //gesturesEnabled: false,
    },
  },
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Event',
      //gesturesEnabled: false,
    }),
  },
});


export const MainScreenStack = TabNavigator(
  {
    Home: {
      screen: EventMapStack
    },
    Links: {
      screen: EventListStack
    },
    Settings: {
      screen: AddEventStack
    },
    Perfil: {
      screen: PerfilStack
    }
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
          case 'Perfil':
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
    //gesturesEnabled: false,
  }
);


export const Root = StackNavigator({
  Login: {
    screen: LoginStack,
  },
  Signup: {
    screen: SignupStack,
  },
  Main: {
    screen: MainScreenStack,
  },
  SelectCategory: {
    screen: SelectCategoryStack,
  },
  SelectTags: {
    screen: SelectTagsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});