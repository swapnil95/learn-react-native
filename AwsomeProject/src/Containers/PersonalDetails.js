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
          <FormPicker
            selectedValue={this.state.travelType}
            model="travelType"
            options={travelTypes.map(function(type) {return type})}
            style={styles.formField}
          />
          {(this.state.travelType === 'Family')?
            <FormPicker
              selectedValue={this.state.memberCount}
              model="memberCount"
              options={memberCount.map(function(count) {return count})}
              style={styles.formField}
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
          <FormInput placeholder="First Name" model="firstName" style={styles.formField}
            value={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].firstName:""}
          />
          <FormInput placeholder="Middle Name" model="middleName" style={styles.formField}
            value={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].middleName:""}
          />
          <FormInput placeholder="Last Name" model="lastName" style={styles.formField}
            value={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].lastName:""}
          />
          <InputDate
            style={{width: 300}}
            date={(this.state.memberDetails && this.state.memberDetails[this.state.selectedMember])?this.state.memberDetails[this.state.selectedMember].dob:""}
            placeholder="Date of Birth"
            model="dob"
            style={[styles.formField,styles.datePicker]}
            showIcon={false}
          />
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
