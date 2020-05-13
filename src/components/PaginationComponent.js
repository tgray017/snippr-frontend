import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

export default class PaginationComponent extends Component {

  handleClick = (direction) => {
    let newOffset
    if(direction === 'prev') {
      newOffset = this.props.offset <= (this.props.nextOffset - this.props.offset) ? 0 : this.props.offset - (this.props.nextOffset - this.props.offset)
    } else {
      newOffset = this.props.nextOffset
    }
    this.props.updateOffset(newOffset)
  }

  render() {
    return (
      <div>
        <Pagination size="lg">
          <Pagination.Prev disabled={ this.props.offset === 0 } onClick={() => this.handleClick('prev')}/>
          <Pagination.Next onClick={() => this.handleClick('next')}/>
        </Pagination>
      </div>
    )
  }
}
