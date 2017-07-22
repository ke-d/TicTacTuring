import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default Cross = ({xTranslate = 0, yTranslate = 0, color}) => {
  return (
    <View style={[styles.container, {
      transform: [
        {translateX: xTranslate ? xTranslate : 10},
        {translateY: yTranslate ? yTranslate : 10},
      ]
    }]}>
      <View style={[styles.line, {
        transform: [
          {rotate: '45deg'},
          {translateX: 0},
          {translateY: 0}
        ],
        backgroundColor: color ? color : '#000'
      }]} />
      <View style={[styles.line, {
        transform: [
          {rotate: '135deg'},
          {translateX: 0},
          {translateY: 0}
        ],
        backgroundColor: color ? color : '#000'
      }]} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  line: {
    position: 'absolute',
    width: 8,
    height: 105
  }

});
