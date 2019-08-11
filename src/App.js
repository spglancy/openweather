import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zip: '',
      mood: '',
      temp: null,
      weather: null
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.getWeather(this.state.zip)
  }

  getWeather(zip) {
    const api = '36697159ee2bad94bfb8136b848fdb6b'
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${api}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res.weather[0].main)
        this.setState({ temp: res.main.temp, weather: res.weather[0].main })
      })
  }

  render() {
    return (
      <div>
        <div className="App" >
          <input placeholder='Zip Code' onChange={e => this.setState({ zip: e.target.value })} value={this.state.zip} />
          <input placeholder='Mood' onChange={(e) => this.setState({ mood: e.target.value })} value={this.state.mood} />
          <button onClick={e => this.handleClick(e)}>Get Weather</button>
        </div>
        <div>
          {this.state.temp === null ? null :
            <div className='container'>
              <p>Weather: {this.state.weather}</p>
              <p>Temperature: {parseInt((this.state.temp - 273.15) * 9 / 5 + 32)}</p>
              <p>Mood: {this.state.mood}</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
