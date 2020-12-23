import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

export default class SearchPodcastsInput extends Component {

  state = {
    searchInput: ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchInput !== prevProps.searchInput || this.props.offset !== prevProps.offset) {
      this.props.fetchPodcasts(this.props.searchInput, this.props.offset)
    }
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      searchInput: event.target.value
    }, () => {
      /* this change triggers a change in state, which forces this whole component
      to re-render and submit another fetchPodcasts request via componentDidUpdate.
      This is necessary for pagination purposes, to prevent a prevPage or nextPage
      click from having to keep track of the searchInput */
      this.props.updateSearchInput(this.state.searchInput)
    })
  }

  render() {
    return (
      <Form className="m-4">
        <Form.Group controlId="search-podcasts">
          <Form.Control
            type="text"
            className="center"
            placeholder="Search podcasts"
            onChange={this.handleChange}
            value={this.state.searchInput}
          />
        </Form.Group>
      </Form>
    )
  }
}
