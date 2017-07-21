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
        renderRow={(rowData, sectionId, rowId) =>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text>{`Game ${parseInt(rowId) + 1}`}</Text>
              <Text>{new Date(rowData.createdAt).toLocaleDateString()}</Text>
            </View>
            <Text>{`Win: ${rowData.won ? "Yes" : "No"}`}</Text>
          </View>

        }
        renderSeperator={(sectionID, rowID, adjacentRowHighlighted) =>
            <View key={rowId} style={styles.separator}/>
        }
        // renderSectionHeader={(sectionData, sectionId) =>
        //   <View style={styles.rowHeader}>
        //     <Text>Game Number</Text>
        //     <Text>Game Won?</Text>
        //     <Text>Date Played</Text>
        //   </View>
        // }
       />
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  row: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
  },
});
