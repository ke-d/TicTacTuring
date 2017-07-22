import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';


export default class MainMenu extends Component {
  static navigationOptions = { title: 'Welcome to TicTacTuring', };
  constructor(props) {
    super(props);
    this.state = {
       email: "",
       password: "",
       fetching: false
     };
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.textInput}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          style={styles.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <View style={styles.row}>
        <Button
          style={styles.button}
          title="Login"
          onPress={() => {
          this.state.fetching = true;
          console.log(this.state);
          return this.props.onLogin(this.state.email, this.state.password)
          .then(result => this.state.fetching = false)
          .catch(error => {
            this.state.fetching = false;
            console.log(error);
            Alert.alert("An Error Has Occured", error.message);
          });
        }}
        />

        <ActivityIndicator
          animating={this.state.fetching}
        />
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 200
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
  },
  button: {
    height: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
