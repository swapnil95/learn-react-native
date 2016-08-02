import React, {Component} from 'react'
import { Text, ScrollView, StyleSheet, TouchableNativeFeedback, View, TextInput, Picker } from 'react-native'
import Form from 'react-native-form'
import DatePicker from 'react-native-datepicker'
import countries from '../Constants/countries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from '../Actions'



class PassportDetails extends Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.state = props.passportDetails
  }

  componentWillReceiveProps(props) {
    this.setState(props.passportDetails)
  }


  onSave() {
    console.log("onSave",this.refs.form.getValues())
    this.props.actions.savePassportDetails(this.refs.form.getValues())
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
  const { passportDetails } = this.state
  return (
    <ScrollView>
      <Form ref="form" customFields={customFields}>
        <TextInput value={this.state.passportNumber} placeholder="Passport Number" type="TextInput" name="passportNumber" />
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
        <TextInput value={this.state.placeOfIssue} placeholder="Place of Issue" type="TextInput" name="placeOfIssue" />
        <Picker type="Picker" name="countryOfIssue" selectedValue={this.state.countryOfIssue}>

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

function mapStateToProps(state) {
  return {
    passportDetails: state.passportDetails
  }
}

function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(PassportDetails)
