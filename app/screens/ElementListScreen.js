import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    elements: state.elements,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_ELEMENTS'}),
  }),
)

export default class ElementList extends Component {
  showElement = (element) => {
    console.log('showElement');
    this.props.navigation.navigate('Element', { ...element });
  };
  componentWillMount() {
    console.log('componentWillMount');
    store.dispatch({type: 'GET_ELEMENTS'});
  }
  render() {
    console.log('FOO1');
    console.log(this.props);
    const { elements, loading, refresh } = this.props;
    console.log(loading);
    console.log(refresh);

    return (
       <View style={styles.container}>
        {elements
          ? <ScrollView
              contentContainerStyle={styles.scrollContent}
              // Hide all scroll indicators
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={refresh}
                />
              }
            >
            <List>
              {elements.map((element, index) => <ListItem
                key={index}
                title={element.name}
                onPress={() => this.showElement(element)}
              />)}
            </List>
            </ScrollView>
          :  <ActivityIndicator
                animating={loading}
                style={styles.loader}
                size="large"
              />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
