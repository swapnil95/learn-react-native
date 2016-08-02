import React from 'react'
import { View } from 'react-native'


export default class Form extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
  }

  render() {
    const { onChange } = this.props

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        onChange: onChange
       })
    )
  return (
    <View>{childrenWithProps}</View>
  )}
}
