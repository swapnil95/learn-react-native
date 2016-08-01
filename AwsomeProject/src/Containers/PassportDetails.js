import React, {Component} from 'react'
import { Text, ScrollView, StyleSheet, TouchableNativeFeedback, View, TextInput, Picker } from 'react-native'
import Form from 'react-native-form'
import DatePicker from 'react-native-datepicker'
import countries from '../Constants/countries'


export default class PassportDetails extends Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.state = {passportIssuanceDate: "", passportExpirationDate: ""}
  }

  onSave() {
    console.log("onSave",this.refs.form.getValues())
    //this.props.actions.savePassportDetails(this.state)
  }

  render() {
  const styles = StyleSheet.create({

      button: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 7,
        backgroundColor: '#777'
      }
    })
  const customFields = {
    'DatePicker': {
    controlled: false,
    valueProp: 'date',
    callbackProp: 'onDateChange',
    }
  }
  return (
    <ScrollView>
      <Form ref="form" customFields={customFields}>
        <TextInput placeholder="Passport Number" type="TextInput" name="passportNumber" />
        <DatePicker
          style={{width: 300}}
          date={this.state.passportIssuanceDate}
          placeholder="Passport Issuance Date"
          onDateChange={(date) => {this.setState({passportIssuanceDate: date})}}
          type="DatePicker"
          name="passportIssuanceDate"
        />
        <DatePicker
          style={{width: 300}}
          date={this.state.passportExpirationDate}
          placeholder="Passport Expiration Date"
          onDateChange={(date) => {this.setState({passportExpirationDate: date})}}
          type="DatePicker"
          name="passportExpirationDate"
        />
        <TextInput placeholder="Place of Issue" type="TextInput" name="placeOfIssue" />
        <Picker type="Picker" name="countryOfIssue">

          {
            countries.map((country,index) =>
              <Picker.Item key={index} label={country.name} value={country.name} />
            )

          }
      </Picker>
      </Form>
      <TouchableNativeFeedback onPress={this.onSave}>
        <View>
          <Text style = {[styles.button,{marginTop: 20}]}>Save</Text>
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  )}
}
