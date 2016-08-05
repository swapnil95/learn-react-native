import React from 'react'
import { View, Text } from 'react-native'
import { Toolbar as MaterialToolbar } from 'react-native-material-design'


export default class MyToolbar extends React.Component {
  render() {
    const { navState } = this.props
  return (
    <MaterialToolbar
        title={navState.routeStack[navState.presentedIndex].title}
        icon="keyboard-backspace"
        rightIconStyle={{
            margin: 10
        }}
    />
  )}
}
