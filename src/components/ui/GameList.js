import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

export default class GameList extends Component {

  render() {

    return (
      <View style={styles.container}>

        <ScrollView>
          {
            this.props.games.map((item, index) => {
              const date = new Date(item.createdAt);
              const paddedSeconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
              return (
                <View key={index} style={styles.row}>
                  <View style={styles.column}>
                    <Text>{`Game ${parseInt(index) + 1}`}</Text>
                    <Text>{`${date.toLocaleDateString()}  ${date.getHours()}:${date.getMinutes()}:${paddedSeconds}`}</Text>
                  </View>
                  <Text>{`Win: ${item.won ? "Yes" : "No"}`}</Text>
                </View>
              );
            })

          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 350
  },
  row: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350
  }
});
