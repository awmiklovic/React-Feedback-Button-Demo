import React, { Component } from 'react';
import './Card.css';

import FeedbackButton from 'react-feedback-button';

class Card extends Component {

  state = {
    reason: '',
    additional: '',
    formValidated: false,
    seconds: this.props.seconds
  }

  componentDidMount(){
    let countInterval = setInterval(()=>{
      this.tick();
      if(this.state.seconds < 1) clearTimeout(countInterval);
    }, 1000);
  }

  form = () => (
    <form>
      <div className="form-group">
        <label>Why did you skip this job?</label>
        <select name="reason" onChange={(e) => this.changeHandler(e)}>
          <option disabled selected>Select One</option>
          <option>Not enough budget.</option>
          <option>Job details unclear.</option>
          <option>No previous experience in task.</option>
          <option>Too much additional research needed to quote.</option>
        </select>
      </div>
    </form>
  )

  formValidate = (name, value) => {
    let memState = {
      ...this.state,
      [name]: value
    }
    console.log(memState);
    return(memState.reason.length > 0)
  }

  formSubmit = () => {
    //alert('Sent form data. Reason:'+this.state.reason+'  Additional Info:'+this.state.additional);
    let newState = {
      ...this.state,
      reason: '',
      additional: ''
    }
    this.setState(newState);
  }

  changeHandler = (e) => {
    //console.log(e.target.name);
    let newState = {
      ...this.state,
      [e.target.name]: e.target.value,
      formValidated: this.formValidate(e.target.name, e.target.value)
    }
    this.setState(newState);
  }

  tick = () => {
    let newState = {
      ...this.state,
      seconds: this.state.seconds-1
    }
    this.setState(newState);
  }

  render(){
    // y = mx + b
    // m = delta y / delta x
    const deltaTime = -300;

    const startR = 32;
    const startG = 150;
    const startB = 243;

    const endR = 220;
    const endG = 36;
    const endB = 36;

    let rVal = ((endR - startR) / deltaTime) * this.state.seconds + endR;
    let gVal = ((endG - startG) / deltaTime) * this.state.seconds + endG;
    let bVal = ((endB - startB) / deltaTime) * this.state.seconds + endB;

    let colorVal = "rgb("+rVal+','+gVal+','+bVal+')';
    console.log(rVal);
    let minutes = Math.floor(this.state.seconds/60);
    let secs = this.state.seconds % 60;
    if (secs < 10) secs = '0'+secs;
    return(
      <div className="Card">
        <div className="topBar">
          <div className="innerBar" style={{width:(this.state.seconds/300)*100+"%", backgroundColor:colorVal}}></div>
        </div>
        {this.props.cardMessage}
        <div className="counter">
          {minutes} : {secs}
          <div className="counter-tooltip">
            Time left for optimal conversion.
          </div>
        </div>
        <FeedbackButton
          ButtonText="Skip"
          TooltipMessage="Would you like to help us out by providing feedback on why you skipped this?"
          Form={this.form()}
          submitFunction={this.formSubmit}
          tooltipOn = {this.props.tooltipPermission}
          disableTooltip = {this.props.toggleTooltipPermission}
          formValidated = {this.state.formValidated}
          buttonFunction = {this.props.skipFunction}
        />
      </div>
    );
  }

}

export default Card;
