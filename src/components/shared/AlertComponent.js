import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

export default class AlertComponent extends Component {

  handleClose = () => {
    this.props.hideAlert()
  }

  renderErrorMessage = () => {
    const listItems = this.props.message.map((message, key) => <li key={key}>{message}</li>)
    return (
      <ul className="mb-0">
        {listItems}
      </ul>
    )
  }

  render() {
    let variant = this.props.status === 'success' ? 'success' : 'danger'
    return (
      <Alert
        variant={variant}
        onClose={this.handleClose}
        dismissible
      >
        {this.renderErrorMessage()}
      </Alert>
    )
  }
}
