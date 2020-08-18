import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import { hideAlert } from '../actions/hideAlert'
import { connect } from 'react-redux'
import Collapse from 'react-bootstrap/Collapse'

class AlertContainer extends Component {

  handleClose = () => {
    this.props.hideAlert()
  }

  render() {
    let variant = this.props.status === 'success' ? 'success' : 'danger'
    if(this.props.showAlert) {
      setTimeout(() => {
        this.props.hideAlert()
      }, 3000)

      return (
      <>
        <div
          aria-controls="alerty"
          aria-expanded={this.props.showAlert}
        >
        </div>
        <Collapse in={this.props.showAlert}>
          <Alert
            id="alerty"
            variant={variant}
            onClose={this.handleClose}
            dismissible
          >
            {this.props.message}
          </Alert>
        </Collapse>
      </>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    showAlert: state.alerts.showAlert,
    status: state.alerts.status,
    message: state.alerts.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideAlert: () => dispatch(hideAlert())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer)