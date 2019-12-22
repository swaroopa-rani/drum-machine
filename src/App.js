import React from 'react';

const audioList = [
  {
    buttonId: 'q',
    audioId: 'Q',
    buttonName: 'Heater-1',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    buttonId: 'w',
    audioId: 'W',
    buttonName: 'Heater-2',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    buttonId: 'e',
    audioId: 'E',
    buttonName: 'Heater-3',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    buttonId: 'a',
    audioId: 'A',
    buttonName: 'Heater-4',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    buttonId: 's',
    audioId: 'S',
    buttonName: 'Clap',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    buttonId: 'd',
    audioId: 'D',
    buttonName: 'Open-HH',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    buttonId: 'z',
    audioId: 'Z',
    buttonName: "Kick-n'-Hat",
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    buttonId: 'x',
    audioId: 'X',
    buttonName: 'Kick',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    buttonId: 'c',
    audioId: 'C',
    buttonName: 'Closed-HH',
    sourceSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioName: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  setDisplay = audioName => {
    this.setState({
      audioName,
    });
  };

  playSound = audioId => {
    const sound = document.getElementById(audioId);
    sound.currentTime = 0;
    sound.play();
  };

  handleKeyPress = event => {
    const keyPressed = event.key;
    const pressedKeyMatched = audioList.find(
      audio =>
        audio.buttonId === keyPressed ||
        audio.buttonId === keyPressed.toLowerCase()
    );

    if (pressedKeyMatched) {
      this.playSound(pressedKeyMatched.audioId);
      this.setDisplay(pressedKeyMatched.buttonName);
    }
  };

  onClick = event => {
    const audioId = event.target.id.toUpperCase();
    this.playSound(audioId);
    const selected = audioList.find(audio => audio.audioId === audioId);
    this.setDisplay(selected ? selected.buttonName : '');
  };

  render() {
    const audioKeyValues = audioList.map(item => (
      <button class="drum-pad" id={item.buttonId} onClick={this.onClick}>
        {item.audioId}
        <audio
          className="clip"
          id={item.audioId}
          src={item.sourceSrc}
          preload="auto"
        />
      </button>
    ));
    return (
      <div id="drum-machine">
        <h1>Drum-Machine</h1>
        <div id="display">
          <h3>{this.state.audioName}</h3>
          <br />
          {audioKeyValues}
        </div>
      </div>
    );
  }
}
