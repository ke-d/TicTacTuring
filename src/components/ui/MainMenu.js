import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';


export default class MainMenu extends Component {
  static navigationOptions = { title: 'Welcome to TicTacTuring', };
  constructor(props) {
    super(props);
    this.state = {
       email: "",
       password: ""
     };
  }

  onLogin() {
      const { login } = this.props;
      const { navigate } = this.props.navigation;

      login(this.state.email, this.state.password)
      .then(result => {
        let token = result.data.signinUser.token;
        console.log("token", token);
        AsyncStorage.setItem("token", token)
        .then((value) => {
          console.log(value);
          navigate("Profile");
        });

      }).catch(error => {
        console.log("error", error);
      });
  }


  render() {
    return (
      <View>
      <TextInput
        placeholder="email"
        keyboardType="email-address"
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
      />
      <Button title="Login" onPress={() =>  this.onLogin()} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
