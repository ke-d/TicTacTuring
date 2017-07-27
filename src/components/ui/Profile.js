import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';

import GameList from './GameList';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { navIndex, initialGames, onNewGames, games, email } = nextProps;
    console.log("new Props", initialGames.length, games.length);
    const thisComponentIndex = 1;
    if(this.props.navIndex > navIndex && navIndex === thisComponentIndex) {
      console.log("back to Profile");
    }
    if(games.length === 0 && initialGames.length !== 0) {
      onNewGames(initialGames);
    }
  }

  // Store the user's games in a redux store as a workaround to https://github.com/apollographql/react-apollo/issues/549
  loadNextPage() {
    return this.props.fetchMore({
      variables: {
        first: 10,
        skip: this.props.games.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {}
    })
    .then((result) => {
      this.props.onNewGames(result.data.user.games);
    });
  }


  render() {
    const { loading, error } = this.props;

    if(loading) {
      return (

        <ActivityIndicator
          animating={true}
          size="large"
        />

      )
    } else if(error) {
      <Text style={styles.welcome}>
        {`An Error has occured`}
      </Text>
    } else {

      const { games, email, loadNextPage } = this.props;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {`${email}`}
          </Text>
          <Button title="Play Game" onPress={() => this.props.navigation.navigate("TicTacTuring")} />
          <GameList
            loadNextPage={() => this.loadNextPage()}
            games={games}
          />

        </View>

      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
