import React, { Component } from 'react';
import './FeedbackButton.css';

class FeedbackButton extends Component {
  state = {
    tooltipShow: false,
    showForm: false
  }

  showTooltip = () => {
    if(!this.props.tooltipOn){
      this.props.buttonFunction();
      return;
    }
    let newState = {
      ...this.state,
      tooltipShow: true
    }
    this.setState(newState);
  }

  hideTooltip = () => {
    let newState = {
      ...this.state,
      tooltipShow: false
    }
    this.setState(newState, () => this.props.buttonFunction());
  }

  showForm = () => {
    let newState = {
      ...this.state,
      showForm: true
    }
    this.setState(newState);
  }

  disableTooltip = () => {
    let newState = {
      ...this.state,
      tooltipShow:false
    }
    this.setState(newState, () => {
      this.props.disableTooltip();
      this.props.buttonFunction();
    });

  }

  submitFunction = () => {
    this.props.submitFunction();
    let newState = {
      ...this.state,
      tooltipShow: false
    }
    this.setState(newState, () => this.props.buttonFunction() );
  }

  render() {
    let classes = 'tooltip';
    let permissionPageClasses = 'permissionPage';
    let formPageClasses = 'formPage';
    let submit = <button className="submit" disabled>Submit</button>
    if(this.state.tooltipShow) classes += ' show';

    if(this.state.showForm){
      permissionPageClasses += ' hide';
      formPageClasses += ' show';
    }
    if(this.props.formValidated) submit = <button className="submit" onClick={this.submitFunction}>Submit</button>;

    return (
      <div className="FeedbackButton">
        <button onClick={this.showTooltip}>{this.props.ButtonText}</button>
        <div className={classes}>
          <div className={permissionPageClasses}>
            <p>{this.props.TooltipMessage}</p>
            <button onClick={this.showForm}>Yes</button>
            <button onClick={this.hideTooltip}>No, thanks</button>
            <div className="disable-link" onClick={this.disableTooltip}>Don't show this again</div>
          </div>
          <div className={formPageClasses}>
            {this.props.Form}
            {submit}
          </div>
        </div>
      </div>
    );
  }
}

const defaultForm = () => {
  return(
    <form>
      <p>This is just a sample form. Pass the form in as a prop!</p>
      <select>
        <option>Sample option 1</option>
        <option>Sample option 2</option>
        <option>Sample option 3</option>
      </select>
      <label>Sample Label</label>
      <input type="text" placeholder="Sample Input"/>
    </form>
  )
}
const defaultSubmitFunction = () => {
  alert('The submit function needs to be passed in through the submitFunction prop.');
}
const defaultDisableTooltip = () => {
  alert('This needs to be passed in as a function that toggles the tooltipOn prop.');
}
const defaultformValidated = () => true;

const defaultButtonFunction = () => {
  alert('The default function for the button needs to be passed as a prop.');
}

FeedbackButton.defaultProps = {
  ButtonText: 'Button',
  TooltipMessage: 'You can set this message with the TooltipMessage prop.',
  tooltipOn: true,
  submitFunction: defaultSubmitFunction,
  disableTooltip: defaultDisableTooltip,
  Form: defaultForm(),
  formValidated: defaultformValidated,
  buttonFunction: defaultButtonFunction
}


export default FeedbackButton;
