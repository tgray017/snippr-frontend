import React, { Component } from 'react'
/*import ReactSearchBox from 'react-search-box'*/

export default class SearchInput extends Component {

  state = {
    searchInput: ''
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      searchInput: event.target.value
    })
    this.props.fetchPodcasts()
    console.log(event.target.value)
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
