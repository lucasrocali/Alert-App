import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';


const { width, height } = Dimensions.get("window");

class ElementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: '',
      text2: ''
    };
  }

    
  render() {
    const { logged, loading, message } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Nome"
                placeholderTextColor="#333"
                style={styles.input}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                placeholderTextColor="#333"
                placeholder="Raça"
                style={styles.input}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
            <View style={styles.inputWrap}>
              <Text
                style={styles.input}
                onPress={() => {
                  console.log('On Select');
                  this.props.navigation.navigate('SelectItem');
                }}
              >Select </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.handlePress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    margin: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#555555',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ElementScreen;
