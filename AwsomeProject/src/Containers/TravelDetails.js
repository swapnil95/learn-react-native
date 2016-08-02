import React, {Component} from 'react'
import { Text, ScrollView, StyleSheet, TouchableNativeFeedback, View, TextInput, Picker } from 'react-native'
import Form from '../Components/Form'
import FormInput from '../Components/FormInput'
import InputDate from '../Components/InputDate'
import countries from '../Constants/countries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from '../Actions'



class TravelDetails extends Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.state = props.travelDetails
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState(props.travelDetails)
  }

  handleFieldValueChange(model, newValue){
    this.setState({[model]: newValue})
  }

  onSave() {
    console.log("onSave",this.state)
    this.props.actions.saveTravelDetails(this.state)
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
      <Form onChange={this.handleFieldValueChange}>

        <InputDate
          style={{width: 300}}
          date={this.state.arrivalDate}
          placeholder="Date of arrival"
          model="arrivalDate"
        />
        <InputDate
          style={{width: 300}}
          date={this.state.departureDate}
          placeholder="Date of Departure"
          model="departureDate"
        />
        <FormInput placeholder="Visa Fees" model="visaFees"
            value={this.state.visaFees} />
        <FormInput placeholder="E-Ticket Number" model="eTicketNumber"
            value={this.state.eTicketNumber} />
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
    travelDetails: state.travelDetails
  }
}

function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(TravelDetails)
