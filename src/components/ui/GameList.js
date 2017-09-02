import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import GameListRow from './GameListRow';

// Creates the view of the game lists in Profile
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
            // console.log(distanceFromEnd);
            const absDistance = Math.abs(distanceFromEnd);
            if(absDistance >= 0 && absDistance < 10) {
              this.props.loadNextPage();
            }
          }}
          onRefresh={() => this.props.loadNextPage()}
          refreshing={false}
          onEndReachedThreshold={.005}
        />
    );
  }
}
