import React, {Component} from 'react'
import { Text, ScrollView, StyleSheet, TouchableNativeFeedback, View, TextInput, Picker } from 'react-native'
import Form from '../Components/Form'
import FormInput from '../Components/FormInput'
import InputDate from '../Components/InputDate'
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

  handleFieldValueChange(model, newValue){
    this.setState({[model]: newValue})
  }

  onSave() {
    console.log("onSave",this.state)
    this.props.actions.savePassportDetails(this.state)
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
  return (
    <ScrollView>
      <Form onChange={this.handleFieldValueChange}>
        <FormInput placeholder="Passport Number" model="passportNumber"
          value={this.state.passportNumber} />
          <InputDate
            style={{width: 300}}
            date={this.state.passportIssuanceDate}
            placeholder="Passport Issuance Date"
            model="passportIssuanceDate"
          />
          <InputDate
            style={{width: 300}}
            date={this.state.passportExpirationDate}
            placeholder="Passport Expiration Date"
            model="passportExpirationDate"
          />
        <FormInput placeholder="Place of Issue" model="placeOfIssue"
          value={this.state.placeOfIssue} />

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
