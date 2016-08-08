import React, {Component} from 'react'
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  TextInput,
  Picker
} from 'react-native'
import Form from '../Components/Form'
import FormInput from '../Components/FormInput'
import InputDate from '../Components/InputDate'
import FormPicker from  '../Components/FormPicker'
import countries from '../Constants/countries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
          height: 36,
          paddingLeft: 16,
          paddingRight: 16,
          fontWeight: 'bold',
          fontSize: 15,
          textAlignVertical: 'center',
          elevation: 10
        },
        buttonWrapper: {
          backgroundColor: '#00bcd4',
          marginTop: 70,
          marginLeft: 16,
          marginRight: 16
        },
        formField: {
          marginTop: 8,
          marginLeft: 16,
          marginRight: 16
        },
        datePicker: {
          width: 305,
          marginTop: 32,
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
        <InputDate
          style={[styles.formField, styles.datePicker]}
          date={this.state.passportIssuanceDate}
          placeholder="Passport Issuance Date"
          model="passportIssuanceDate"
          showIcon={false}
        />
        <InputDate
          style={[styles.formField, styles.datePicker]}
          date={this.state.passportExpirationDate}
          placeholder="Passport Expiration Date"
          model="passportExpirationDate"
          showIcon={false}
        />
        <FormPicker
          selectedValue={this.state.countryOfIssue}
          style={[styles.formField, {marginTop: 30}]}
          model="countryOfIssue"
          options={countries.map(function(country) {return country.name})} />
      </Form>
      <View style={styles.buttonWrapper}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('white')}
          onPress={this.onSave} activeOpacity='100'>
          <View>
            <Text style = {[styles.button]}>SAVE</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
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
