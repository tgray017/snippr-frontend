import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

export default class PaginationComponent extends Component {

  handleClick = (direction) => {
    if (this.props.paginationType === "podcasts") {
      let newOffset
      if(direction === 'prev') {
        newOffset = this.props.offset < 10 ? 0 : this.props.offset - 10
      } else {
        newOffset = this.props.nextOffset
      }
      this.props.updateOffset(newOffset)
    } else {
      if(direction === 'prev') {
        /* this is thenable but the then doesn't actually execute after the promise is returned ??? */
        this.props.updatePrevPages()
        this.props.fetchEpisodes(this.props.podcastId, this.props.previousPagePubDate, 'prev')
      } else {
        this.props.fetchEpisodes(this.props.podcastId, this.props.nextEpisodePubDate, 'next')
      }
    }
  }

  renderPrevDisabled = () => {
    if (this.props.paginationType === "podcasts") {
      return this.props.offset === 0
    } else {
      return this.props.previousPages.length === 0
    }
  }

  renderNextDisabled = () => {
    if (this.props.paginationType === "podcasts") {
      return this.props.nextOffset - this.props.offset < 10
    } else {
      return this.props.nextEpisodePubDate === this.props.earliestEpisodePubDate
    }
  }

  render() {
    return (
      <div>
        <Pagination size="lg" className="justify-content-md-center">
          <Pagination.Prev disabled={ this.renderPrevDisabled() } onClick={() => this.handleClick('prev')}/>
          <Pagination.Next disabled={ this.renderNextDisabled() } onClick={() => this.handleClick('next')}/>
        </Pagination>
      </div>
    )
  }
}
