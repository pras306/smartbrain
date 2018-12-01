import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import FaceRecogonition from './components/FaceRecogonition/FaceRecogonition.js';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    move: {
      enable: true,
      speed: 6
    }
  }  
}
const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register') this.setState(initialState);
    else this.setState({isSignedIn: true});
    this.setState({route: route});
  }
  calculateFaceLocation = (data) => {
    const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;    
    return {
      top_row: height * clarifaiData.top_row,
      left_col : width * clarifaiData.left_col,
      bottom_row : height - (height * clarifaiData.bottom_row),
      right_col : width - (width * clarifaiData.right_col)
    }
  }
  hightlightFaceBox = (box) => {    
    this.setState({box: box});
  }
  onChangeInput = (event) => {    
    this.setState({ input: event.target.value });
  }
  onButtonClick = (event) => {
    this.setState({imageURL: this.state.input});
    fetch('https://guarded-falls-10334.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
    })
    .then(response => response.json())
    .then(response => {      
      if(response) {
        fetch('https://guarded-falls-10334.herokuapp.com/images', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.hightlightFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
  }
  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  render() {
    const {imageURL, box, route, isSignedIn} = this.state;
    return (
      <div>
        <Particles className='particles' params={ particleOptions} />
        <Navigation signedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : route === 'register'
          ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm searchChange={this.onChangeInput} buttonClick={this.onButtonClick} />
            <FaceRecogonition box={box} imageURL={imageURL} />
          </div>
        }        
      </div>
    );  
  }
}

export default App;
  