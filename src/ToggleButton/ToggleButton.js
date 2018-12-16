import React, { Component } from 'react';
import './ToggleButton.css';

class ToggleButton extends Component {

  render(){
    let toggleClass = "ToggleButton";
    if(this.props.on) toggleClass +=" on";
    let value = (this.props.on)? "On" : "Off";
    return(
      <div className={toggleClass} onClick={this.props.toggleFunction}>
        <label>{this.props.label}</label>
        <div className="toggle-group">
          <div className="toggle-wrap">
            <div className="track"></div>
            <div className="slider"></div>
          </div>
          <div className="value">{value}</div>
        </div>
      </div>
    );
  }

}

export default ToggleButton;
