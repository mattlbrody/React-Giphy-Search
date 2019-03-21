import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const SearchBar = (props) => {
  return (
    <div className="ui input">
      <input
        value={props.value} 
        placeholder="Find the gif of your dreams!" 
        type="text"
        onChange={e => props.onSearchInput(e.target.value)}
      />
    </div>
  );
}

const DisplayGifs = (props) => {

  const gifs = props.data.map(gif => {
    return (
      <div className="column">
        <div className="ui card" key={gif.id}>
          <div className="image">
            <img src={gif.images.fixed_width_downsampled.url} alt={gif.id} />
          </div>
        </div>
      </div>
    );
  })

  return gifs;
}

class App extends Component {
  state = { searchTerm: '', gifs: [] }

  onSearchInput = (term) => {
    this.setState({ searchTerm: term })
  }

  onHandleSubmit = async (e) => {
    e.preventDefault();
    const gifs = await axios.get('http://api.giphy.com/v1/gifs/search?q=' + this.state.searchTerm + '&api_key=MRLay8p2J7b0XwOwbZOJVCau52Fn4B6R&limit=12')
    this.setState({ searchTerm: '', gifs: gifs.data.data })
  }

  render() {
    return (
      <div className="ui container">
        <h1>Gify Search API</h1>
        <div className="ui segment">
          <form onSubmit={this.onHandleSubmit}>
            <SearchBar 
              value={this.state.searchTerm}
              onSearchInput={this.onSearchInput}
            />
          </form>
        </div>
        <div className="ui three column grid">
          <DisplayGifs 
            data={this.state.gifs}
          />
        </div>
      </div>
    );
  };
};

export default App;
