import React from 'react'
import { Picker } from 'react-native'

export default class FormInput extends React.Component{

  static propTypes = {
    onChange: React.PropTypes.func,
    model: React.PropTypes.string,
    options: React.PropTypes.array
  }

  render() {
  	const { onChange,model,options, ...other } = this.props
    return(
      <Picker {...other} onValueChange={(value) => onChange(model, value)}>
        {options.map((option,index) =>
            <Picker.Item key={option+"-"+index} label={option} value={option} />
        )}
      </Picker>
    )}
}
