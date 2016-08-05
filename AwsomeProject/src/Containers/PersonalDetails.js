import React, {Component} from 'react'
import {
  Text, ScrollView, StyleSheet, TouchableNativeFeedback,
  View, TextInput, Picker, Radio
 } from 'react-native'
import Form from '../Components/Form'
import FormInput from '../Components/FormInput'
import InputDate from '../Components/InputDate'
import FormPicker from  '../Components/FormPicker'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'

import { travelTypes, memberCount } from '../Constants/AppConstants'
import * as ActionCreators from '../Actions'


export default class PersonalDetails extends Component {

  constructor(props) {
    super(props)
    this.state = props.personalDetails
  }

  componentWillReceiveProps(props) {
    this.setState(props.personalDetails)
  }

  handleFieldValueChange = (model, newValue) => {
    if(model === 'memberCount') {
  		let temp = []
  		for(var i=0; i< newValue; i++) {
  			temp.push({})
  		}
  		this.setState({memberDetails: temp})
  	}
    this.setState({[model]: newValue})
  }

  handleMemberDetailsChange = (model, value) => {
    this.state.memberDetails[this.state.selectedMember][model] = value
  	this.setState(this.state)
  }

  handleMemberChange = (memberIndex) => {
    this.setState({selectedMember: parseInt(memberIndex)})
  }

  onSave = () => {
    this.props.actions.savePersonalDetails(this.state)
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
        <Form onChange={this.handleFieldValueChange}>
          <FormPicker
            selectedValue={this.state.travelType}
            model="travelType"
            options={travelTypes.map(function(type) {return type})}
          />
          {(this.state.travelType === 'Family')?
            <FormPicker
              selectedValue={this.state.memberCount}
              model="memberCount"
              options={memberCount.map(function(count) {return count})}
            />
            :<View></View>
          }
        </Form>
        {(this.state.memberCount > 1)?
          <TouchableNativeFeedback>
            <View style={{flexDirection: 'row'}}>
              {this.state.memberDetails.map((member,index) =>
                <Text key={index}
                      style = {[styles.button,{marginTop: 20, width: 70}]}
                      id={"member-"+(index+1)}
                      onPress={() => this.handleMemberChange(index)}>
                        Member {index+1}
                </Text>
              )}
            </View>
          </TouchableNativeFeedback>
          :<View></View>
        }
        <Form onChange={this.handleMemberDetailsChange}>
          <FormInput placeholder="First Name" model="firstName"
            value={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].firstName:""}
          />
          <FormInput placeholder="Middle Name" model="middleName"
            value={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].middleName:""}
          />
          <FormInput placeholder="Last Name" model="lastName"
            value={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].lastName:""}
          />
          <InputDate
            style={{width: 300}}
            date={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].dob:""}
            placeholder="Date of Birth"
            model="dob"
          />
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
