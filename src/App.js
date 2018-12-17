import React, { Component } from 'react';
import './App.css';

import Card from './Card/Card';
import ToggleButton from './ToggleButton/ToggleButton';
import { TransitionGroup, CSSTransition} from "react-transition-group";

class App extends Component {

  constructor(props){
    super(props);
  }

  state = {
    cards:[{key:1,message: 'This is the first job.', secondsLeft: 246},
          {key:2,message: 'This is the second job.', secondsLeft: 103},
          {key:3,message: 'This is the third job.', secondsLeft: 235},
          {key:4,message: 'This is the fourth job.', secondsLeft: 38},
          {key:5,message: 'This is the fifth job.', secondsLeft: 127},
          {key:6,message: 'This is the sixth job.', secondsLeft: 259},
          {key:7,message: 'This is the seventh job.', secondsLeft: 120},
          {key:8,message: 'This is the eigth job.', secondsLeft: 102},
          {key:9,message: 'This is the ninth job.', secondsLeft: 211},
          {key:10,message: 'This is the tenth job.', secondsLeft: 267}],
    selectedIndex: 0,
    tooltipPermission: true,
    seconds: 60
  }

  toggleTooltipPermission = () => {
    let newState = {
      ...this.state,
      tooltipPermission: !this.state.tooltipPermission
    }
    this.setState(newState);
  }

  skipFunction = () => {
    this.setState((prevState)=>({
      selectedIndex: (prevState.selectedIndex < prevState.cards.length-1) ? prevState.selectedIndex + 1 : 0
    }));
  }

  render() {
    let cardSection = "There are no jobs right now!";
    if(this.state.selectedIndex < this.state.cards.length){
      let card = this.state.cards[this.state.selectedIndex];
      cardSection =
        (
          <Card
            key={card.key}
            cardMessage={card.message}
            skipFunction={this.skipFunction}
            toggleTooltipPermission={this.toggleTooltipPermission}
            tooltipPermission={this.state.tooltipPermission}
            seconds={card.secondsLeft}
          />
        );
    }

    return (
      <div className="App">
        <ToggleButton
          label="Feedback Mode"
          toggleFunction={this.toggleTooltipPermission}
          on={this.state.tooltipPermission}
        />
        <div className="CardContainer">
          <TransitionGroup>
            <CSSTransition
              key={this.state.selectedIndex}
              classNames="slide"
              timeout={1000}
            >
              {cardSection}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
