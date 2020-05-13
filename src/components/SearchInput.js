import React, { Component } from 'react'

export default class SearchInput extends Component {

  state = {
    searchInput: ''
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      /* Need to store this is state before fetching in order for pagination components to work */
      searchInput: event.target.value
    }, () => {
      this.props.fetchEpisodes(this.state.searchInput)
    })
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search podcasts or episodes"
            onChange={this.handleChange}
            value={this.state.searchInput}
          />
        </form>
      </div>
    )
  }
}
