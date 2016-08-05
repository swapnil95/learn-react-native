import React from 'react'
import DatePicker from 'react-native-datepicker'


export default class FormInput extends React.Component{

  static propTypes = {
    onChange: React.PropTypes.func,
    model: React.PropTypes.string
  }

  render() {
  	const { onChange,model, ...other } = this.props
    return(
  	    <DatePicker {...other} onDateChange={(date) => onChange(model, date)} />
    )}
}
