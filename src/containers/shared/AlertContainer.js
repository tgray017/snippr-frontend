import React, { Component } from 'react'
import { hideAlert } from '../../actions/shared'
import AlertComponent from '../../components/shared/AlertComponent'
import { connect } from 'react-redux'

class AlertContainer extends Component {

  render() {
    if (this.props.showAlert) {
      setTimeout(() => {
        this.props.hideAlert()
      }, 5000)

      return (
        <AlertComponent
          status={this.props.status}
          message={this.props.message}
          hideAlert={this.props.hideAlert}
        />
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
