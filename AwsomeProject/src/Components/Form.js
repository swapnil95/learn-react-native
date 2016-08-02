import React from 'react'


export default class Form extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  }

  render() {
    const { onChange, onSubmit } = this.props

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        onChange: onChange
       })
    )
  return (
    <form onSubmit={(e)=> {e.preventDefault(); onSubmit()}}>{childrenWithProps}</form>
  )}
}
