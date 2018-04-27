import React from 'react';
//import RaisedButton from 'material-ui/RaisedButton';


class Timer extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      bigTime: 1499,
      status: 'pomodoro',
      minutes: '25',
      seconds: '00',
      countdownId: '',
      buttonText: 'Start'
    }
  }
  
  counter () {   
    // calculate minutes and seconds
    var mins  = Math.floor(this.state.bigTime / 60);
    var secs = this.state.bigTime - (this.state.minutes * 60);
    
    // set/update new minutes and seconds 
    this.setState({minutes: (this.state.minutes < 10 ? '0' : '') + mins});
    this.setState({seconds: (this.state.seconds < 10 ? '0' : '') + secs});
    
    // if timer ends change status 
    if ( this.state.bigTime === 0 ) {
      
      if ( this.state.status === 'pomodoro' ) {
        
        // TODO play audio sample timer bell
        
        // cooldown status is 5 minutes
        this.setState({
          status: 'cooldown', 
          bigTime: 300
        })
      
      } else if ( this.state.status === 'cooldown' ) {
        
        // TODO play audio sample timer bell
        
        // swith to normal status 25 minutes
        this.setState({
          status: 'pomodoro', 
          bigTime: 1499,
          minutes: '25',
          seconds: '00'
        })
        // show start button 
        this.setState({buttonText: 'Start'})
        
        // stop the timer
        clearInterval(this.state.countdownId);
        
      }
    } else {
      // decrement bigTime value
      this.setState({bigTime: this.state.bigTime - 1})     
    }
    
  }
  
  
  startTimer () {
    var context = this;
    
    // start timer
    this.setState({countdownId: setInterval(()=> {context.counter()}, 10)});
    
    // show stop button 
    this.setState({buttonText: 'Stop'}) 
  }
  
  
  stopTimer () {
    // stop timer
    clearInterval(this.state.countdownId);
    
    // show reset button
    this.setState({buttonText: 'Reset'})
    
  }
  
  resetTimer () {

    // swith to normal status 25 minutes
    this.setState({ 
      bigTime: 1499,
      minutes: '25',
      seconds: '00'
    })
    
    // reset bigTime
    this.setState({bigTime: 1499});
    
    // show start button
    this.setState({buttonText: 'Start'})
    
  }
  
  handleClick () {
    if ( this.state.buttonText === 'Start' ) {
      this.startTimer()
    }
    if ( this.state.buttonText === 'Stop' ) {
      this.stopTimer();
    }
    if ( this.state.buttonText == 'Reset' ) {
      this.resetTimer();
    }
  }
  
  
  render () {
    
    return (
    
      <div className='timer-wrapper'>
        
        <div className='timer-row'>
          TIMER {this.state.minutes} : {this.state.seconds} 
          
          <button
            onClick={()=> this.handleClick()} 
            className="timer-btn"
            >
            {this.state.buttonText}
          </button>
          

             
        </div>
        <div className="timer-status">{this.state.status}</div>
        
      </div>  
    
    )
  }
  
}

export default Timer;




