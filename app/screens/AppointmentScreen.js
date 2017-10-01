import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class AppointmentScreen extends Component {
  render() {
    console.log(this.props.navigation.state.params);
    const appointment = this.props.navigation.state.params;
    console.log('AppointmentScreen');
    console.log(appointment);
    return (
      <ScrollView>
        <Text>{`${appointment.from_datetime.toUpperCase()} ${appointment.to_datetime.toUpperCase()}`}
        </Text>

      </ScrollView>
    );
  }
}

export default AppointmentScreen;
