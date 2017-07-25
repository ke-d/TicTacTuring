import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default GameListRow = ({item, index}) => {
  const date = new Date(item.createdAt);
  const paddedSeconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <Text>{`Game ${parseInt(index) + 1}`}</Text>
        <Text>{`${date.toLocaleDateString()}  ${date.getHours()}:${date.getMinutes()}:${paddedSeconds}`}</Text>
      </View>
      <Text>{`Win: ${item.won ? "Yes" : "No"}`}</Text>
    </View>
  );
};

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
