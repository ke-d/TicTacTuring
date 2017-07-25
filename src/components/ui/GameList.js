import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import GameListRow from './GameListRow';

export default class GameList extends Component {

  render() {

    return (
        <FlatList
          data={this.props.games}
          renderItem={({item, index}) => {
            return (
              <GameListRow
                key={index}
                item={item}
                index={index}
              />
            )
          }}
          keyExtractor={(item, index) => index}
          onEndReached={({distanceFromEnd}) => {
            console.log(distanceFromEnd);
          }}
          onEndReachedThreshold={.1}
        />
    );
  }
}
