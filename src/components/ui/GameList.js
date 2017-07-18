import React, { Component } from 'react';
import { Text, ListView, StyleSheet, View } from 'react-native';

export default class GameList extends Component {
  constructor(props) {
    super(props);
    let { games } = this.props;
    // console.log(games);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = { dataSource: ds.cloneWithRows(games), };

  }
  componentWillReceiveProps(nextProps) {
     if (nextProps.games !== this.props.games) {
       let { games } = nextProps;
       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(games)
       });
     }
 }
  render() {

    return (
    <View style={styles.container}>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View style={styles.row}>
            <Text>{rowData.id}</Text>
            <Text>{rowData.won ? "Yes" : "No"}</Text>
            <Text>{rowData.datePlayed}</Text>
          </View>
        }
        renderHeader={() =>
          <View style={styles.rowHeader}>
            <Text>"Game Number"</Text>
            <Text>"Game Won?"</Text>
            <Text>"Date Played"</Text>
          </View>
        }
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350
  }
});
