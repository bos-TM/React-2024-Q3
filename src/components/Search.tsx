import React, { Component, ChangeEvent } from 'react'

interface Props {
  onSearch: (term: string) => void
}

interface State {
  searchTerm: string
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const savedSearchTerm = localStorage.getItem('searchTerm') || ''
    this.state = { searchTerm: savedSearchTerm }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value })
  }

  handleSearch = () => {
    const { searchTerm } = this.state
    const trimmedSearchTerm = searchTerm.trim()
    localStorage.setItem('searchTerm', trimmedSearchTerm)
    this.props.onSearch(trimmedSearchTerm)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    )
  }
}

export default Search
