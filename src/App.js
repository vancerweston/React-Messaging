import React from 'react';
import {Component} from "react";
import Messages from './components/Messages';
import Input from './components/Input';
import Header from './components/Header';
import 'emoji-mart/css/emoji-mart.css';
import './App.css';


function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

// need to add 0's... 2 min is 2 not 02
function getTime() {
  let date = new Date();
  let hour = date.getHours()+1;
  let min = date.getMinutes();


  if (hour > 12) {
    let test = hour - 12;
    let time = test + ':' + min + ' PM';
    return time;
  } else if (hour < 12) {
    let time = hour + ':' + min + ' AM';
    return time;
  } else if (hour === 12) {
    let time = hour + ':' + min + ' AM'
  } else {
    let time = 'Unkown';
    return time;
  }
}

class App extends Component {

  constructor() {
    super();
    this.drone = new window.Scaledrone('yZHKZ5Zq52CyYoAu', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
      const room = this.drone.subscribe('observable-Tea with Walter and Henry');
      room.on('data', (data, member) => {
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
      });
    });
  }

  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
      timestamp: getTime()
    }
  }
  
  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-Tea with Walter and Henry',
      message
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    )
  }
}

export default App;
