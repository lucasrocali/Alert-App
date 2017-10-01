import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class EventScreen extends Component {
  render() {
    console.log(this.props.navigation.state.params);
    const event = this.props.navigation.state.params;
    console.log('EventScreen');
    console.log(event);
    return (
      <ScrollView>
        <Text>{ event.category.name + ' ' + event.location.lat + ' ' + event.location.lon }
        </Text>

      </ScrollView>
    );
  }
}

export default EventScreen;
