import React, {Component} from 'react'
import { Text, ScrollView, StyleSheet, TouchableNativeFeedback, View, TextInput, Picker } from 'react-native'
import Form from '../Components/Form'
import FormInput from '../Components/FormInput'
import InputDate from '../Components/InputDate'
import FormPicker from  '../Components/FormPicker'
import countries from '../Constants/countries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-native-material-design'

import * as ActionCreators from '../Actions'



class PassportDetails extends Component {
  constructor(props) {
    super(props)
    this.state = props.passportDetails
  }

  componentWillReceiveProps(props) {
    this.setState(props.passportDetails)
  }

  handleFieldValueChange = (model, newValue) => {
    this.setState({[model]: newValue})
  }

  onSave = () => {
    this.props.actions.savePassportDetails(this.state)
  }


  render() {

    const styles = StyleSheet.create({
        button: {
          textAlign: 'center',
          color: 'white',
          marginBottom: 7,
          backgroundColor: '#777'
        },
        formField: {
          marginTop: 10,
          marginBottom: 10,
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
      <Form onChange={this.handleFieldValueChange}>
        <FormInput placeholder="Passport Number" model="passportNumber"
          value={this.state.passportNumber} style={styles.formField} />
        <FormInput placeholder="Place of Issue" model="placeOfIssue"
          value={this.state.placeOfIssue} style={styles.formField} />
        <FormPicker selectedValue={this.state.countryOfIssue} style={styles.formField} model="countryOfIssue" options={countries.map(function(country) {return country.name})} />
        <InputDate
          style={styles.formField, {width: 350}}
          date={this.state.passportIssuanceDate}
          placeholder="Passport Issuance Date"
          model="passportIssuanceDate"
        />
        <InputDate
          style={styles.formField, {width: 350}}
          date={this.state.passportExpirationDate}
          placeholder="Passport Expiration Date"
          model="passportExpirationDate"
        />
      </Form>
      <TouchableNativeFeedback>
        <View>
          <Button text="Save" raised style={{marginTop: 10}}/>
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
