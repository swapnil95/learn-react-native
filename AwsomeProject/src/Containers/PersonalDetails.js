import React, {Component} from 'react'
import {
  Text, ScrollView, StyleSheet, TouchableNativeFeedback,
  View, TextInput, Picker, Radio
 } from 'react-native'
import Form from 'react-native-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from '../Actions'
import DatePicker from 'react-native-datepicker'

import { travelTypes } from '../Constants/AppConstants'

export default class PersonalDetails extends Component {

  constructor(props) {
    super(props)
    this.state = props.personalDetails
  }

  componentWillReceiveProps(props) {
    this.setState(props.personalDetails)
  }

  onSave = () => {
    this.props.actions.savePassportDetails(this.refs.form.getValues())
  }

  render () {

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
          <Picker type="Picker" name="travelType">
            {
              travelTypes.map((type,index) =>
                <Picker.Item key={index} label={type} value={type} />
            )}
          </Picker>
          <TextInput
            value={this.state.memberCount}
            placeholder="Member Count" type="TextInput"
            name="memberCount" />
          <TextInput
            value={this.state.firstName}
            placeholder="First Name" type="TextInput"
            name="firstName" />
          <TextInput
            value={this.state.middleName}
            placeholder="Middle"
            type="TextInput" name="placeOfIssue" />
          <DatePicker
            style={{width: 300}}
            date={this.state.dob}
            placeholder="Date of Birth"
            onDateChange={(date) => {this.setState({dob: date})}}
            type="DatePicker"
            name="dob" />
        </Form>
        <TouchableNativeFeedback onPress={this.onSave}>
          <View>
            <Text style = {[styles.button,{marginTop: 20}]}>Save</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    personalDetails: state.personalDetails
  }
}

function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(PersonalDetails)
