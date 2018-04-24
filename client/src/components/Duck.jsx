import React from 'react';
import axios from 'axios';

class Duck extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuote: 'Keep your feet warm',
      quotes: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick() {
    this.setState({currentQuote: this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)].text})
  }

  componentWillMount() {
    const that = this
    axios.get('/quotes')
      .then((res) => {
        that.setState({quotes: res.data, currentQuote: 'Click a Duck!'})
    })
  }

  render () {
    return (
      <div className="duck" onClick={this.handleClick} >
        <div className="duck-image">
          <img src="/assets/duck.png" alt=""/>
        </div>
        <div className="duck-text-wrap">
          <p className="duck-text">
            {this.state.currentQuote}
          </p>
        </div>

      </div>
    )
  }
} 


export default Duck;