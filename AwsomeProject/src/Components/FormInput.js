import React from 'react'
import styles from './styles/form-label.scss'

export default class FormInput extends React.Component{

  componentDidMount() {
    let helpIconId = this.props.id + "-popover";
    $(function () {
      $('.popover-dismiss').popover({
        trigger: 'focus'
      })
    })
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    helpText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string.isRequired,
    model: React.PropTypes.string
  }

  render() {
  	const { title, id,  helpText, model, required, onChange,...other } = this.props
    let helpIconId = id + "-popover";
    return(
  		<div className="row field-container">
        <div className="col-md-6 col-xs-12">
          <label htmlFor={id}>{title}{(required === true)?"*":""}</label>
          {(helpText)?
            <span ref={function(handle) {
              $(handle).popover();
            }} className="help-icon" tabIndex="0" data-toggle="popover" data-trigger="focus" data-content={helpText}><sup><i className="fa fa-info-circle" aria-hidden="true"></i></sup></span>
            :
            ""
          }
        </div>
      <div className="col-md-6 col-xs-12" >
        <input {...other} id={id} onChange={(event) => onChange(model, event.target.value)}/>
      </div>
    </div>
  	)}
}
