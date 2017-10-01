import React from 'react';
import { Constants, MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';

import store from '../store'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

@connect(
  state => ({
    events: state.events,
    loading: state.loading
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_EVENTS'}),
  }),
)

export default class EventMap extends React.Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

  componentDidMount() {
    this._getLocationAsync();
    store.dispatch({type: 'GET_EVENTS'});
  }

  _handleMapRegionChange = mapRegion => {
    console.log("_handleMapRegionChange ");
    //this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.005,
    },
    this.setState({location, region})
  }
  render() {
    console.log(this.props);
    const { events, loading, refresh } = this.props;
    return (
      <MapView
          style={{ flex: 1 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="My Marker"
            description="Some description"
          />
         
         {events && events.map((event, index) => 
             <MapView.Marker
              coordinate= { { latitude: event.location.lat, longitude: event.location.lon } }
              title= { event.category.name }
              description="Some description"
            />
          )}
        </MapView>
    );
  }
}
 