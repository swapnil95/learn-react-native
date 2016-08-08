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
    this.state = props.travelDetails
  }

  componentWillReceiveProps(props) {
    this.setState(props.travelDetails)
  }

  handleFieldValueChange = (model, newValue) => {
    this.setState({[model]: newValue})
  }

  onSave = () => {
    console.log("onSave",this.state)
    this.props.actions.saveTravelDetails(this.state)
  }

  render() {
    const styles = StyleSheet.create({
        button: {
          textAlign: 'center',
          color: 'white',
          marginTop: 70,
          marginBottom: 10,
          marginLeft: 16,
          marginRight: 16,
          backgroundColor: '#00bcd4',
          height: 36,
          elevation: 5,
          paddingLeft: 16,
          paddingRight: 16,
          fontWeight: 'bold',
          fontSize: 15,
          textAlignVertical: 'center'
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

        <InputDate
          style={{width: 300}}
          date={this.state.arrivalDate}
          placeholder="Date of arrival"
          model="arrivalDate"
          style={[styles.formField, styles.datePicker]}
          showIcon={false}
        />
        <InputDate
          style={{width: 300}}
          date={this.state.departureDate}
          placeholder="Date of Departure"
          model="departureDate"
          style={[styles.formField, styles.datePicker]}
          showIcon={false}
        />
        <FormInput placeholder="Visa Fees" model="visaFees"
            value={this.state.visaFees} style={styles.formField}/>
        <FormInput placeholder="E-Ticket Number" model="eTicketNumber"
            value={this.state.eTicketNumber} style={styles.formField}/>
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
    travelDetails: state.travelDetails
  }
}

function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(TravelDetails)
