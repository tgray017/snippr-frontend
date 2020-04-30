import React, { Component } from 'react'
/*import ReactSearchBox from 'react-search-box'*/

export default class SearchInput extends Component {

  state = {
    searchInput: ''
  }

  handleChange = input => {
    this.props.fetchPodcasts()
    console.log(this.props.results)
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search podcasts or episodes"
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}
