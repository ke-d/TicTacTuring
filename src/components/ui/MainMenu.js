import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';


export default class MainMenu extends Component {
  static navigationOptions = { title: 'Welcome to TicTacTuring', };
  constructor(props) {
    super(props);
    this.state = {
       email: "user@email.com",
       password: "secret-password",
       fetching: false
     };
  }

  login(email, password) {
    this.state.fetching = true;
    this.props.onLogin(email, password)
    .then((result) => {
      let token = result.data.signinUser.token;
      this.state.fetching = false
      return token;
    })
    .then(token => AsyncStorage.setItem("token", token))
    .then(() => {
      let { navigate } = this.props.navigation;
      return navigate("Profile");
    })
    .catch(error => {
      this.state.fetching = false;
      console.log(error);
      Alert.alert("An Error Has Occured", error.message);
    });
  }

  logout() {
      const { login } = this.props;

      AsyncStorage.removeItem("token")
      .then((value) => {
        console.log("logout", value);

      });
  }

  componentWillReceiveProps(nextProps) {
    const { navIndex } = nextProps;
    const thisComponentIndex = 0;
    if(this.props.navIndex > navIndex && navIndex === thisComponentIndex) {
      console.log("back to MainMenu");
      this.logout();
    }
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
          onPress={() => this.login(this.state.email, this.state.password)}
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
