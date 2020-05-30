import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import '../stylesheets/Audio.css'

class SnippingContainer extends Component {

  handleClick = () => {
    console.log('hello')
  }

  render() {
    return (
      <div className="mt-3 snipping-container">
        <Button
           variant="outline-secondary"
           className="m-2"
           onClick={this.handleClick}
        >
          <img className='button' src={require('../images/cut.svg')}></img>
        </Button>
        <DropdownButton
          drop="right"
          variant="outline-secondary"
          title={
            <img className='button' src={require('../images/menu.svg')}></img>
          }
          className="m-2 menu-options"
        >
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </DropdownButton>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(SnippingContainer)
