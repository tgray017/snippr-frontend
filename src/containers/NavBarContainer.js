import React, { PureComponent } from 'react'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'

class NavBarContainer extends PureComponent {

  render() {
    return (
      <NavBar
        authenticated={this.props.authenticated}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated
  }
}

export default connect(mapStateToProps)(NavBarContainer)
