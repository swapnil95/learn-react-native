import React from 'react'
import {TextInput} from 'react-native'

export default class FormInput extends React.Component{

  static propTypes = {
    onChange: React.PropTypes.func,
    model: React.PropTypes.string
  }

  render() {
  	const { onChange,model, ...other } = this.props
    return(
  	    <TextInput {...other} onChange={(event) => onChange(model, event.nativeEvent.text)} />
    )}
}
