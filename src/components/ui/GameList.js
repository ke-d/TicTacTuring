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
            const absDistance = Math.abs(distanceFromEnd);
            // console.log(this.props.loadNextPage);
            // const { loadNextPage } = this.props.onPageLoad;
            if(absDistance >= 0 && absDistance < 10) {
              // this.props.loadNextPage();
            }
          }}
          onEndReachedThreshold={.005}
        />
    );
  }
}
